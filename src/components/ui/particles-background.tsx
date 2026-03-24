import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    particlesJS: (tag_id: string, params: object) => void;
    pJSDom: Array<{ pJS: { interactivity: { mouse: { pos_x: number | null; pos_y: number | null } }; tmp: { retina: boolean }; canvas: { pxratio: number } } }>;
  }
}

export const ParticlesBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
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
      // We'll load the library code dynamically or just include the logic here.
      // Given the request to "use this", I'll implement the library logic 
      // in a way that works inside React.
      
      const scriptId = 'particles-js-lib';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.innerHTML = `
          /* particles.js v2.0.0 */
          var pJS = function(tag_id, params){
            var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');
            this.pJS = {
              canvas: { el: canvas_el, w: canvas_el.offsetWidth, h: canvas_el.offsetHeight },
              particles: {
                number: { value: 400, density: { enable: true, value_area: 800 } },
                color: { value: '#fff' },
                shape: { type: 'circle', stroke: { width: 0, color: '#ff0000' }, polygon: { nb_sides: 5 }, image: { src: '', width: 100, height: 100 } },
                opacity: { value: 1, random: false, anim: { enable: false, speed: 2, opacity_min: 0, sync: false } },
                size: { value: 20, random: false, anim: { enable: false, speed: 20, size_min: 0, sync: false } },
                line_linked: { enable: true, distance: 100, color: '#fff', opacity: 1, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 3000, rotateY: 3000 } },
                array: []
              },
              interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab:{ distance: 100, line_linked:{ opacity: 1 } }, bubble:{ distance: 200, size: 80, duration: 0.4 }, repulse:{ distance: 200, duration: 0.4 }, push:{ particles_nb: 4 }, remove:{ particles_nb: 2 } },
                mouse:{}
              },
              retina_detect: false,
              fn: { interact: {}, modes: {}, vendors:{} },
              tmp: {}
            };
            var pJS = this.pJS;
            if(params){ Object.deepExtend(pJS, params); }
            pJS.tmp.obj = {
              size_value: pJS.particles.size.value, size_anim_speed: pJS.particles.size.anim.speed, move_speed: pJS.particles.move.speed, line_linked_distance: pJS.particles.line_linked.distance,
              line_linked_width: pJS.particles.line_linked.width, mode_grab_distance: pJS.interactivity.modes.grab.distance, mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
              mode_bubble_size: pJS.interactivity.modes.bubble.size, mode_repulse_distance: pJS.interactivity.modes.repulse.distance
            };
            pJS.fn.retinaInit = function(){
              if(pJS.retina_detect && window.devicePixelRatio > 1){ pJS.canvas.pxratio = window.devicePixelRatio; pJS.tmp.retina = true; } 
              else{ pJS.canvas.pxratio = 1; pJS.tmp.retina = false; }
              pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
              pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;
              pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
              pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
              pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
              pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
              pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
              pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
              pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
              pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
              pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;
            };
            pJS.fn.canvasInit = function(){ pJS.canvas.ctx = pJS.canvas.el.getContext('2d'); };
            pJS.fn.canvasSize = function(){
              pJS.canvas.el.width = pJS.canvas.w; pJS.canvas.el.height = pJS.canvas.h;
              if(pJS && pJS.interactivity.events.resize){
                window.addEventListener('resize', function(){
                    pJS.canvas.w = pJS.canvas.el.offsetWidth; pJS.canvas.h = pJS.canvas.el.offsetHeight;
                    if(pJS.tmp.retina){ pJS.canvas.w *= pJS.canvas.pxratio; pJS.canvas.h *= pJS.canvas.pxratio; }
                    pJS.canvas.el.width = pJS.canvas.w; pJS.canvas.el.height = pJS.canvas.h;
                    if(!pJS.particles.move.enable){ pJS.fn.particlesEmpty(); pJS.fn.particlesCreate(); pJS.fn.particlesDraw(); pJS.fn.vendors.densityAutoParticles(); }
                    pJS.fn.vendors.densityAutoParticles();
                });
              }
            };
            pJS.fn.canvasPaint = function(){ pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h); };
            pJS.fn.canvasClear = function(){ pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h); };
            pJS.fn.particle = function(color, opacity, position){
              this.radius = (pJS.particles.size.random ? Math.random() : 1) * pJS.particles.size.value;
              if(pJS.particles.size.anim.enable){ this.size_status = false; this.vs = pJS.particles.size.anim.speed / 100; if(!pJS.particles.size.anim.sync){ this.vs = this.vs * Math.random(); } }
              this.x = position ? position.x : Math.random() * pJS.canvas.w;
              this.y = position ? position.y : Math.random() * pJS.canvas.h;
              if(this.x > pJS.canvas.w - this.radius*2) this.x = this.x - this.radius; else if(this.x < this.radius*2) this.x = this.x + this.radius;
              if(this.y > pJS.canvas.h - this.radius*2) this.y = this.y - this.radius; else if(this.y < this.radius*2) this.y = this.y + this.radius;
              if(pJS.particles.move.bounce){ pJS.fn.vendors.checkOverlap(this, position); }
              this.color = {};
              if(typeof(color.value) == 'object'){ if(color.value instanceof Array){ var color_selected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)]; this.color.rgb = hexToRgb(color_selected); }else{ if(color.value.r != undefined && color.value.g != undefined && color.value.b != undefined){ this.color.rgb = { r: color.value.r, g: color.value.g, b: color.value.b } } if(color.value.h != undefined && color.value.s != undefined && color.value.l != undefined){ this.color.hsl = { h: color.value.h, s: color.value.s, l: color.value.l } } } }
              else if(color.value == 'random'){ this.color.rgb = { r: (Math.floor(Math.random() * 256)), g: (Math.floor(Math.random() * 256)), b: (Math.floor(Math.random() * 256)) } }
              else if(typeof(color.value) == 'string'){ this.color = color; this.color.rgb = hexToRgb(this.color.value); }
              this.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * pJS.particles.opacity.value;
              if(pJS.particles.opacity.anim.enable){ this.opacity_status = false; this.vo = pJS.particles.opacity.anim.speed / 100; if(!pJS.particles.opacity.anim.sync){ this.vo = this.vo * Math.random(); } }
              var velbase = {};
              switch(pJS.particles.move.direction){
                case 'top': velbase = { x:0, y:-1 }; break;
                case 'top-right': velbase = { x:0.5, y:-0.5 }; break;
                case 'right': velbase = { x:1, y:-0 }; break;
                case 'bottom-right': velbase = { x:0.5, y:0.5 }; break;
                case 'bottom': velbase = { x:0, y:1 }; break;
                case 'bottom-left': velbase = { x:-0.5, y:1 }; break;
                case 'left': velbase = { x:-1, y:0 }; break;
                case 'top-left': velbase = { x:-0.5, y:-0.5 }; break;
                default: velbase = { x:0, y:0 }; break;
              }
              if(pJS.particles.move.straight){ this.vx = velbase.x; this.vy = velbase.y; if(pJS.particles.move.random){ this.vx = this.vx * (Math.random()); this.vy = this.vy * (Math.random()); } }
              else{ this.vx = velbase.x + Math.random()-0.5; this.vy = velbase.y + Math.random()-0.5; }
              this.vx_i = this.vx; this.vy_i = this.vy;
              var shape_type = pJS.particles.shape.type;
              if(typeof(shape_type) == 'object'){ if(shape_type instanceof Array){ var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)]; this.shape = shape_selected; } }else{ this.shape = shape_type; }
            };
            pJS.fn.particle.prototype.draw = function() {
              var p = this; var radius = p.radius_bubble != undefined ? p.radius_bubble : p.radius; var opacity = p.opacity_bubble != undefined ? p.opacity_bubble : p.opacity;
              if(p.color.rgb){ var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+opacity+')'; }
              else{ var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+opacity+')'; }
              pJS.canvas.ctx.fillStyle = color_value; pJS.canvas.ctx.beginPath();
              switch(p.shape){
                case 'circle': pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false); break;
                case 'edge': pJS.canvas.ctx.rect(p.x-radius, p.y-radius, radius*2, radius*2); break;
                case 'triangle': pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x-radius, p.y+radius / 1.66, radius*2, 3, 2); break;
                case 'polygon': pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius / (pJS.particles.shape.polygon.nb_sides/3.5), p.y - radius / (2.66/3.5), radius*2.66 / (pJS.particles.shape.polygon.nb_sides/3), pJS.particles.shape.polygon.nb_sides, 1); break;
                case 'star': pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius*2 / (pJS.particles.shape.polygon.nb_sides/4), p.y - radius / (2*2.66/3.5), radius*2*2.66 / (pJS.particles.shape.polygon.nb_sides/3), pJS.particles.shape.polygon.nb_sides, 2); break;
              }
              pJS.canvas.ctx.closePath();
              if(pJS.particles.shape.stroke.width > 0){ pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color; pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width; pJS.canvas.ctx.stroke(); }
              pJS.canvas.ctx.fill();
            };
            pJS.fn.particlesCreate = function(){ for(var i = 0; i < pJS.particles.number.value; i++) { pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value)); } };
            pJS.fn.particlesUpdate = function(){
              for(var i = 0; i < pJS.particles.array.length; i++){
                var p = pJS.particles.array[i];
                if(pJS.particles.move.enable){ var ms = pJS.particles.move.speed/2; p.x += p.vx * ms; p.y += p.vy * ms; }
                if(pJS.particles.opacity.anim.enable) { if(p.opacity_status == true) { if(p.opacity >= pJS.particles.opacity.value) p.opacity_status = false; p.opacity += p.vo; }else { if(p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true; p.opacity -= p.vo; } if(p.opacity < 0) p.opacity = 0; }
                if(pJS.particles.size.anim.enable){ if(p.size_status == true){ if(p.radius >= pJS.particles.size.value) p.size_status = false; p.radius += p.vs; }else{ if(p.radius <= pJS.particles.size.anim.size_min) p.size_status = true; p.radius -= p.vs; } if(p.radius < 0) p.radius = 0; }
                if(p.x - p.radius > pJS.canvas.w){ p.x = 0; p.y = Math.random() * pJS.canvas.h; } else if(p.x + p.radius < 0){ p.x = pJS.canvas.w; p.y = Math.random() * pJS.canvas.h; }
                if(p.y - p.radius > pJS.canvas.h){ p.y = 0; p.x = Math.random() * pJS.canvas.w; } else if(p.y + p.radius < 0){ p.y = pJS.canvas.h; p.x = Math.random() * pJS.canvas.w; }
                if(pJS.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove'){
                  if(pJS.interactivity.events.onhover.mode == 'grab') pJS.fn.modes.grabParticle(p);
                  if(pJS.interactivity.events.onhover.mode == 'bubble' || pJS.interactivity.events.onclick.mode == 'bubble') pJS.fn.modes.bubbleParticle(p);
                  if(pJS.interactivity.events.onhover.mode == 'repulse') pJS.fn.modes.repulseParticle(p);
                }
                if(pJS.particles.line_linked.enable){ for(var j = i + 1; j < pJS.particles.array.length; j++){ var p2 = pJS.particles.array[j]; pJS.fn.interact.linkParticles(p,p2); } }
              }
            };
            pJS.fn.particlesDraw = function(){ pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h); pJS.fn.particlesUpdate(); for(var i = 0; i < pJS.particles.array.length; i++){ var p = pJS.particles.array[i]; p.draw(); } };
            pJS.fn.interact.linkParticles = function(p1, p2){
              var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx*dx + dy*dy);
              if(dist <= pJS.particles.line_linked.distance){
                var opacity_line = pJS.particles.line_linked.opacity - (dist / (1/pJS.particles.line_linked.opacity)) / pJS.particles.line_linked.distance;
                if(opacity_line > 0){        
                  var color_line = pJS.particles.line_linked.color_rgb_line; let ctx = pJS.canvas.ctx;
                  ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')'; ctx.lineWidth = pJS.particles.line_linked.width;
                  ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); ctx.closePath();
                }
              }
            };
            pJS.fn.modes.repulseParticle = function(p){
              var dx_mouse = p.x - pJS.interactivity.mouse.pos_x, dy_mouse = p.y - pJS.interactivity.mouse.pos_y, dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);
              var repulseRadius = pJS.interactivity.modes.repulse.distance, velocity = 100, repulseFactor = Math.min(Math.max((1/repulseRadius)*(-1*Math.pow(dist_mouse/repulseRadius,2)+1)*repulseRadius*velocity, 0), 50);
              p.x += (dx_mouse/dist_mouse) * repulseFactor; p.y += (dy_mouse/dist_mouse) * repulseFactor;
            };
            pJS.fn.modes.grabParticle = function(p){
              var dx_mouse = p.x - pJS.interactivity.mouse.pos_x, dy_mouse = p.y - pJS.interactivity.mouse.pos_y, dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);
              if(dist_mouse <= pJS.interactivity.modes.grab.distance){
                var opacity_line = pJS.interactivity.modes.grab.line_linked.opacity - (dist_mouse / (1/pJS.interactivity.modes.grab.line_linked.opacity)) / pJS.interactivity.modes.grab.distance;
                if(opacity_line > 0){
                  var color_line = pJS.particles.line_linked.color_rgb_line;
                  pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')'; pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
                  pJS.canvas.ctx.beginPath(); pJS.canvas.ctx.moveTo(p.x, p.y); pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y); pJS.canvas.ctx.stroke(); pJS.canvas.ctx.closePath();
                }
              }
            };
            pJS.fn.vendors.eventsListeners = function(){
              if(pJS.interactivity.detect_on == 'window'){
                pJS.interactivity.el = window;
              }else{
                pJS.interactivity.el = pJS.canvas.el;
              }
              pJS.interactivity.el.addEventListener('mousemove', function(e){
                var pos_x, pos_y;
                if(pJS.interactivity.el == window){
                  pos_x = e.clientX;
                  pos_y = e.clientY;
                } else {
                  var rect = pJS.canvas.el.getBoundingClientRect();
                  pos_x = e.clientX - rect.left;
                  pos_y = e.clientY - rect.top;
                }
                pJS.interactivity.mouse.pos_x = pos_x;
                pJS.interactivity.mouse.pos_y = pos_y;
                if(pJS.tmp.retina){ pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio; pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio; }
                pJS.interactivity.status = 'mousemove';
              });
              pJS.interactivity.el.addEventListener('mouseleave', function(){ pJS.interactivity.mouse.pos_x = null; pJS.interactivity.mouse.pos_y = null; pJS.interactivity.status = 'mouseleave'; });
            };
            pJS.fn.vendors.densityAutoParticles = function(){
              if(pJS.particles.number.density.enable){
                var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;
                if(pJS.tmp.retina){ area = area/(pJS.canvas.pxratio*2); }
                var nb_particles = area * pJS.particles.number.value / pJS.particles.number.density.value_area;
                var missing_particles = pJS.particles.array.length - nb_particles;
                if(missing_particles < 0) pJS.fn.modes.pushParticles(Math.abs(missing_particles));
                else pJS.fn.modes.removeParticles(missing_particles);
              }
            };
            pJS.fn.modes.pushParticles = function(nb, pos){ pJS.tmp.pushing = true; for(var i = 0; i < nb; i++){ pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value, { 'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w, 'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h })); if(i == nb-1){ if(!pJS.particles.move.enable){ pJS.fn.particlesDraw(); } pJS.tmp.pushing = false; } } };
            pJS.fn.modes.removeParticles = function(nb){ pJS.particles.array.splice(0, nb); if(!pJS.particles.move.enable){ pJS.fn.particlesDraw(); } };
            pJS.fn.vendors.drawShape = function(c, startX, startY, sideLength, sideCount, sideDenominator){
              c.save(); c.beginPath(); c.translate(startX, startY); c.moveTo(0,0);
              for (var i = 0; i < sideCount; i++) { c.lineTo(sideLength,0); c.translate(sideLength,0); c.rotate(Math.PI - Math.PI * (180 * (sideCount / sideDenominator - 2)) / (sideCount / sideDenominator) / 180); }
              c.fill(); c.restore();
            };
            pJS.fn.vendors.draw = function(){ pJS.fn.particlesDraw(); pJS.fn.drawAnimFrame = requestAnimationFrame(pJS.fn.vendors.draw); };
            pJS.fn.vendors.init = function(){ pJS.fn.retinaInit(); pJS.fn.canvasInit(); pJS.fn.canvasSize(); pJS.fn.canvasPaint(); pJS.fn.particlesCreate(); pJS.fn.vendors.densityAutoParticles(); pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color); };
            pJS.fn.vendors.start = function(){ pJS.fn.vendors.init(); pJS.fn.vendors.draw(); };
            pJS.fn.vendors.eventsListeners(); pJS.fn.vendors.start();
          };
          Object.deepExtend = function(destination, source) { for (var property in source) { if (source[property] && source[property].constructor && source[property].constructor === Object) { destination[property] = destination[property] || {}; arguments.callee(destination[property], source[property]); } else { destination[property] = source[property]; } } return destination; };
          function hexToRgb(hex){ var shorthandRegex = /^#?([a-f\\d])([a-f\\d])([a-f\\d])$/i; hex = hex.replace(shorthandRegex, function(m, r, g, b) { return r + r + g + g + b + b; }); var result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex); return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null; };
          window.particlesJS = function(tag_id, params){ if(typeof(tag_id) != 'string'){ params = tag_id; tag_id = 'particles-js'; } if(!tag_id){ tag_id = 'particles-js'; } var pJS_tag = document.getElementById(tag_id), pJS_canvas_class = 'particles-js-canvas-el', exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class); if(exist_canvas.length){ while(exist_canvas.length > 0){ pJS_tag.removeChild(exist_canvas[0]); } } var canvas_el = document.createElement('canvas'); canvas_el.className = pJS_canvas_class; canvas_el.style.width = "100%"; canvas_el.style.height = "100%"; var canvas = document.getElementById(tag_id).appendChild(canvas_el); if(canvas != null){ window.pJSDom = window.pJSDom || []; window.pJSDom.push(new pJS(tag_id, params)); } };
        `;
        document.body.appendChild(script);
      }

      const init = () => {
        if (window.particlesJS) {
          window.particlesJS('particles-js', {
            "particles": {
              "number": { "value": 25, "density": { "enable": true, "value_area": 1200 } },
              "color": { "value": "#ffffff" },
              "shape": { "type": "circle" },
              "opacity": { "value": 0.08, "random": true, "anim": { "enable": true, "speed": 1.2, "opacity_min": 0.05, "sync": false } },
              "size": { "value": 4, "random": true },
              "line_linked": { "enable": true, "distance": 180, "color": "#ffffff", "opacity": 0.15, "width": 1 },
              "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
              "detect_on": "window", // Keep on window for global tracking but we'll optimize the loop
              "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
              "modes": { "repulse": { "distance": 120, "duration": 0.4 }, "push": { "particles_nb": 3 } }
            },
            "retina_detect": true
          });

          // Professional Mouse Smoothing (Lerp) - snappier but still smooth
          const pjsList = window.pJSDom;
          if (!pjsList || pjsList.length === 0) return;
          const pjs = pjsList[pjsList.length - 1].pJS;
          
          const realMouse = { x: 0, y: 0 };
          const lerpMouse = { x: 0, y: 0 };
          const lerpFactor = 0.12;

          const updateMousePosition = (e: MouseEvent) => {
            realMouse.x = e.clientX;
            realMouse.y = e.clientY;
          };

          window.addEventListener('mousemove', updateMousePosition);

          const smoothLoop = () => {
            if (!isVisibleRef.current) {
              animationFrameRef.current = requestAnimationFrame(smoothLoop);
              return;
            }

            lerpMouse.x += (realMouse.x - lerpMouse.x) * lerpFactor;
            lerpMouse.y += (realMouse.y - lerpMouse.y) * lerpFactor;
            
            pjs.interactivity.mouse.pos_x = lerpMouse.x;
            pjs.interactivity.mouse.pos_y = lerpMouse.y;
            
            if (pjs.tmp.retina) {
              pjs.interactivity.mouse.pos_x *= pjs.canvas.pxratio;
              pjs.interactivity.mouse.pos_y *= pjs.canvas.pxratio;
            }
            
            animationFrameRef.current = requestAnimationFrame(smoothLoop);
          };
          smoothLoop();

          return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
          };
        } else {
          setTimeout(init, 100);
        }
      };

      init();

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, []);

    return (
      <div id="particles-js" ref={containerRef} className="absolute inset-0 pointer-events-none opacity-40 z-0 overflow-hidden" />
    );
};
