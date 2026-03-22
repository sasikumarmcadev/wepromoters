import { DottedSurface } from "@/components/ui/dotted-surface";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function DottedHero() {
	return (
		<section className="relative w-full h-[65vh] xs:h-[70vh] sm:h-[80vh] md:h-screen flex items-center justify-center overflow-hidden bg-background">
			{/* Subtler Background Glow */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_70%)] pointer-events-none" />
			
			<DottedSurface className="h-[32.5vh] sm:h-full w-full opacity-40" />
			
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_50%)]',
						'blur-[120px]',
					)}
				/>
				
				<div className="relative z-10 flex flex-col items-center justify-center">
					{/* Logo with sophisticated float */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ 
							duration: 1.5, 
							ease: [0.23, 1, 0.32, 1] 
						}}
					>
						<img
							src="https://res.cloudinary.com/dhw6yweku/image/upload/v1756276288/l3kbqtpkrsz2lqshmmmj.png"
							alt="Logo"
							className="h-14 sm:h-24 md:h-32 w-auto brightness-110 active:scale-95 transition-transform"
						/>
					</motion.div>

					<div className="mt-8 flex flex-col items-center justify-center space-y-3">
						<motion.p 
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 1, ease: [0.23, 1, 0.32, 1] }}
							className="text-2xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] text-white uppercase"
						>
							Digital Marketing Agency
						</motion.p>
						
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1, duration: 1.5 }}
							className="flex items-center gap-4"
						>
							<div className="h-px w-8 sm:w-12 bg-white/20" />
							<p className="text-[10px] sm:text-sm md:text-base font-bold tracking-[0.4em] text-white/40 ">
								We convert business into brand
							</p>
							<div className="h-px w-8 sm:w-12 bg-white/20" />
						</motion.div>
					</div>
				</div>
			</div>

			{/* Bottom Decorative Element */}
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
				<div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
			</div>
		</section>
	);
}
