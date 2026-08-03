import React, { useEffect, useRef } from 'react';

/**
 * Renders the 3D poem animation hero section.
 */
export const PoemAnimation = ({ poemHTML, backgroundImageUrl, boyImageUrl }: { poemHTML: string, backgroundImageUrl: string, boyImageUrl: string }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    // This effect handles the responsive scaling of the animation container.
    useEffect(() => {
        function adjustContentSize() {
            if (contentRef.current) {
                const viewportWidth = window.innerWidth;
                const baseWidth = 1000;
                const scaleFactor = viewportWidth < baseWidth ? (viewportWidth / baseWidth) * 0.9 : 1;
                contentRef.current.style.transform = `scale(${scaleFactor})`;
            }
        }

        adjustContentSize();
        window.addEventListener("resize", adjustContentSize);
        return () => window.removeEventListener("resize", adjustContentSize);
    }, []);

    return (
        <header className="hero-section absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black">
            <div className="container relative w-full h-full flex items-center justify-center">
                <div 
                    ref={contentRef} 
                    className="content relative origin-center" 
                    style={{ display: 'block', width: '1000px', height: '562px' }}
                >
                    <div className="container-full relative w-full h-full perspective-[1000px]">
                        <div className="animated hue absolute inset-0 bg-emerald-500/20 mix-blend-overlay z-0"></div>
                        <img className="backgroundImage absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity" src={backgroundImageUrl} alt="An old stone courtyard at dawn" onError={(e) => (e.currentTarget.style.display = 'none')} />
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <img className="boyImage w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-[0_0_50px_rgba(16,185,129,0.3)] border-2 border-emerald-500/30" src={boyImageUrl} alt="A man and woman practicing with swords" onError={(e) => (e.currentTarget.style.display = 'none')} />
                        </div>
                        
                        <div className="container absolute inset-0 z-20 pointer-events-none">
                            <div className="cube w-full h-full relative preserve-3d">
                                <div className="face top"></div>
                                <div className="face bottom"></div>
                                <div className="face left text font-mono text-emerald-400 text-3xl font-bold tracking-widest leading-relaxed whitespace-nowrap" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                                <div className="face right text font-mono text-emerald-400 text-3xl font-bold tracking-widest leading-relaxed whitespace-nowrap" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                                <div className="face front"></div>
                                <div className="face back text font-mono text-emerald-400 text-3xl font-bold tracking-widest leading-relaxed whitespace-nowrap" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                            </div>
                        </div>

                        <div className="container-reflect absolute inset-0 z-20 pointer-events-none opacity-30 transform scale-y-[-1] translate-y-40 blur-sm">
                            <div className="cube w-full h-full relative preserve-3d">
                                <div className="face top"></div>
                                <div className="face bottom"></div>
                                <div className="face left text font-mono text-emerald-400 text-3xl font-bold tracking-widest leading-relaxed whitespace-nowrap" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                                <div className="face right text font-mono text-emerald-400 text-3xl font-bold tracking-widest leading-relaxed whitespace-nowrap" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                                <div className="face front"></div>
                                <div className="face back text font-mono text-emerald-400 text-3xl font-bold tracking-widest leading-relaxed whitespace-nowrap" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
