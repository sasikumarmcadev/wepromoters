'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const { theme } = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		particles: THREE.Points[];
		animationId: number;
		count: number;
	} | null>(null);

	const isVisibleRef = useRef(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisibleRef.current = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		if (containerRef.current) observer.observe(containerRef.current);

		return () => {
			if (containerRef.current) observer.unobserve(containerRef.current);
		};
	}, []);

	useEffect(() => {
		if (!containerRef.current) return;

		const SEPARATION = 90;
		const AMOUNTX = 500;
		const AMOUNTY = 150;

		// Scene setup
		const scene = new THREE.Scene();
		const fogColor = theme === 'dark' ? 0x000000 : 0xffffff;
		scene.fog = new THREE.Fog(fogColor, 2000, 10000);

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		camera.position.set(0, 355, 1220);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: false, // Performance boost
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2)); // Reduced pixel ratio for performance
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(scene.fog.color, 0);

		containerRef.current.appendChild(renderer.domElement);

		const positions: number[] = [];
		const colors: number[] = [];
		const ixiyArray: number[] = []; // Store grid coords for GPU

		// Create geometry for all particles
		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const y = 0; // Will be animated
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				positions.push(x, y, z);
				ixiyArray.push(ix, iy);
				if (theme === 'dark') {
					colors.push(80, 80, 1); // White dots for dark theme
				} else {
					colors.push(0, 0, 0); // Black dots for light theme
				}
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
		geometry.setAttribute('ixiy', new THREE.Float32BufferAttribute(ixiyArray, 2));


		const uniforms = { uTime: { value: 0 } };

		// Create material
		const material = new THREE.PointsMaterial({
			size: 4,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		// Inject custom shader logic for GPU-accelerated wave animation
		material.onBeforeCompile = (shader) => {
			shader.uniforms.uTime = uniforms.uTime;
			shader.vertexShader = 'uniform float uTime;\nattribute vec2 ixiy;\n' + shader.vertexShader;
			shader.vertexShader = shader.vertexShader.replace(
				'#include <begin_vertex>',
				`
				vec3 transformed = vec3(position);
				transformed.y = sin((ixiy.x + uTime) * 0.3) * 50.0 + sin((ixiy.y + uTime) * 0.5) * 50.0;
                `
			);
		};

		// Create points object
		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;
		let animationId = 0;

		// Animation function
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			if (!isVisibleRef.current) return;

			// Update uniforms instead of looping over 270,000 points on the CPU
			uniforms.uTime.value = count;

			renderer.render(scene, camera);
			count += 0.1;
		};


		// Handle window resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		// Start animation
		animate();

		// Store references
		sceneRef.current = {
			scene,
			camera,
			renderer,
			particles: [points],
			animationId,
			count,
		};

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleResize);

			if (sceneRef.current) {
				cancelAnimationFrame(sceneRef.current.animationId);

				// Clean up Three.js objects
				sceneRef.current.scene.traverse((object: THREE.Object3D) => {
					if (object instanceof THREE.Points) {
						object.geometry.dispose();
						if (Array.isArray(object.material)) {
							object.material.forEach((material: THREE.Material) => material.dispose());
						} else {
							(object.material as THREE.Material).dispose();
						}
					}
				});

				sceneRef.current.renderer.dispose();

				if (containerRef.current && sceneRef.current.renderer.domElement) {
					containerRef.current.removeChild(
						sceneRef.current.renderer.domElement,
					);
				}
			}
		};
	}, [theme]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none absolute inset-0 z-0', className)}
			{...props}
		/>
	);
}
