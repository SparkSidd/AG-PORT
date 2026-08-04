import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"

interface Character {
    char: string
    x: number
    y: number
    speed: number
}

class TextScramble {
    el: HTMLElement
    chars: string
    queue: Array<{
        from: string
        to: string
        start: number
        end: number
        char?: string
    }>
    frame: number
    frameRequest: number
    resolve: (value: void | PromiseLike<void>) => void

    constructor(el: HTMLElement) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#'
        this.queue = []
        this.frame = 0
        this.frameRequest = 0
        this.resolve = () => { }
        this.update = this.update.bind(this)
    }

    setText(newText: string) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise<void>((resolve) => this.resolve = resolve)
        this.queue = []

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({ from, to, start, end })
        }

        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }

    update() {
        let output = ''
        let complete = 0

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)]
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }

        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
}

const CyclingRoles: React.FC = () => {
    const elementRef = useRef<HTMLDivElement>(null)
    const scramblerRef = useRef<TextScramble | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (elementRef.current && !scramblerRef.current) {
            scramblerRef.current = new TextScramble(elementRef.current)
            setMounted(true)
        }
    }, [])

    useEffect(() => {
        if (mounted && scramblerRef.current) {
            const phrases = [
                'FULL STACK DEVELOPMENT',
                'CYBER SECURITY',
                'AI-ML'
            ]

            let counter = 0
            const next = () => {
                if (scramblerRef.current) {
                    scramblerRef.current.setText(phrases[counter]).then(() => {
                        setTimeout(next, 1200)
                    })
                    counter = (counter + 1) % phrases.length
                }
            }

            next()
        }
    }, [mounted])

    return (
        <div
            ref={elementRef}
            className="text-[#00ff00] font-mono font-bold tracking-[0.22em] mt-2 h-8 sm:h-10 flex items-center justify-center drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]"
            style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.25rem)' }}
        >
            FULL STACK DEV
        </div>
    )
}

const RainingLetters: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())

    const createCharacters = useCallback(() => {
        const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
        const charCount = 300
        const newCharacters: Character[] = []

        for (let i = 0; i < charCount; i++) {
            newCharacters.push({
                char: allChars[Math.floor(Math.random() * allChars.length)],
                x: Math.random() * 100,
                y: Math.random() * 100,
                speed: 0.1 + Math.random() * 0.3,
            })
        }

        return newCharacters
    }, [])

    useEffect(() => {
        setCharacters(createCharacters())
    }, [createCharacters])

    useEffect(() => {
        const updateActiveIndices = () => {
            const newActiveIndices = new Set<number>()
            const numActive = Math.floor(Math.random() * 3) + 3
            for (let i = 0; i < numActive; i++) {
                newActiveIndices.add(Math.floor(Math.random() * characters.length))
            }
            setActiveIndices(newActiveIndices)
        }

        const flickerInterval = setInterval(updateActiveIndices, 50)
        return () => clearInterval(flickerInterval)
    }, [characters.length])

    useEffect(() => {
        let animationFrameId: number

        const updatePositions = () => {
            setCharacters(prevChars =>
                prevChars.map(char => ({
                    ...char,
                    y: char.y + char.speed,
                    ...(char.y >= 100 && {
                        y: -5,
                        x: Math.random() * 100,
                        char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[
                            Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".length)
                        ],
                    }),
                }))
            )
            animationFrameId = requestAnimationFrame(updatePositions)
        }

        animationFrameId = requestAnimationFrame(updatePositions)
        return () => cancelAnimationFrame(animationFrameId)
    }, [])

    return (
        <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center select-none">
            {/* Title & Roles */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4 max-w-3xl pointer-events-auto">
                <h1
                    className="text-white font-bold tracking-[0.18em] mb-1 sm:mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 'clamp(1.5rem, 3.2vw, 2.75rem)',
                        lineHeight: 1.2
                    }}
                >
                    SIDDHARTH KUMAR
                </h1>
                <CyclingRoles />
            </div>

            {/* Raining Characters */}
            {characters.map((char, index) => (
                <span
                    key={index}
                    className={`absolute transition-colors duration-100 pointer-events-none select-none ${activeIndices.has(index)
                        ? "text-[#00ff00] font-bold z-10 scale-110"
                        : "text-slate-600 font-light"
                        }`}
                    style={{
                        left: `${char.x}%`,
                        top: `${char.y}%`,
                        transform: `translate(-50%, -50%) ${activeIndices.has(index) ? 'scale(1.15)' : 'scale(1)'}`,
                        textShadow: activeIndices.has(index)
                            ? '0 0 8px rgba(0,255,0,0.8), 0 0 12px rgba(0,255,0,0.4)'
                            : 'none',
                        opacity: activeIndices.has(index) ? 1 : 0.45,
                        transition: 'color 0.1s, transform 0.1s, text-shadow 0.1s',
                        willChange: 'transform, top',
                        fontSize: activeIndices.has(index) ? '1.1rem' : '0.85rem'
                    }}
                >
                    {char.char}
                </span>
            ))}

            <style>{`
        .dud {
          color: #0f0;
          opacity: 0.8;
          text-shadow: 0 0 6px rgba(0,255,0,0.6);
        }
      `}</style>
        </div>
    )
}

export default RainingLetters
