export function Footer() {
	return (
		<footer className="fixed bottom-0 left-0 w-full z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
			<div className="container mx-auto px-6 py-4">
				<p className="text-sm text-gray-500 text-center">
					MVP (Projeto S.O.P.A) 1.0.0 - Copyright © {new Date().getFullYear()}{" "}
					COINTE
				</p>
			</div>
		</footer>
	);
}
