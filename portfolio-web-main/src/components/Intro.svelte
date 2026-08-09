<script>
    import Tag from "./Tag.svelte";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    const languages = [
        "Hello!", 
        "வணக்கம்!", 
        "ನಮಸ್ಕಾರ!", 
        "Bonjour!", 
        "नमस्ते!"
    ];
    let currentText = "Hello!";
    let langIndex = 0;
    let charIndex = 6; // Starts fully typed
    let isDeleting = false;

    onMount(() => {
        let timeout;

        function type() {
            const currentLang = languages[langIndex];
            
            if (isDeleting) {
                currentText = currentLang.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentLang.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 120;

            if (!isDeleting && currentText === currentLang) {
                typeSpeed = langIndex === 0 ? 7000 : 2500; // English stays for 7s, others 2.5s
                isDeleting = true;
            } else if (isDeleting && currentText === "") {
                isDeleting = false;
                langIndex = (langIndex + 1) % languages.length;
                typeSpeed = 500; // Pause before typing next word
            }

            timeout = setTimeout(type, typeSpeed);
        }

        // Start animation after a short delay
        timeout = setTimeout(() => {
            isDeleting = true;
            type();
        }, 7000);

        return () => clearTimeout(timeout);
    });
</script>

<section>
    <div class="globalwrapper" in:fade={{ duration: 2000 }}>
        <div class="text-container">
            <h4>{currentText}<span class="cursor">|</span></h4>
            <span class="typing-text"><h1>I'm Hari Prasad</h1></span>
        </div>
        <div class="tags-container">
            <Tag name="Designer" />
            <Tag name="Coder" />
            <Tag name="Musician" />
        </div>
    </div>
</section>

<style>
    section {
        font-family: "DM Sans", sans-serif;
        color: #daf4d2;
        display: flex;
        flex-direction: column;
        height: 870px;
        align-items: center;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        align-self: center;
        align-content: center;
        position: relative;
    }

    .globalwrapper {
        margin-top: 60px;
        padding: 10px;
        align-items: center;
        align-content: center;
        align-self: center;
        text-align: center;
    }

    .text-container {
        align-items: center;
        text-align: center;
        align-self: center;
        gap: none;
    }

    h1 {
        font-size: 72px;
        font-weight: 400;
        margin: 0px;
        padding-bottom: 10px;
        display: inline-block;
    }



    @keyframes blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }

    .cursor {
        display: inline-block;
        margin-left: 4px;
        animation: blink 1s step-end infinite;
        color: #daf4d2;
        font-weight: 300;
    }

    h4 {
        margin: 0px;
        font-size: 24px;
        padding-bottom: 10px;
        font-weight: 400;
    }

    .tags-container {
        align-items: center;
        align-self: center;
        justify-content: center;
        justify-self: center;
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 48px;
        }

        h4 {
            font-size: 18px;
        }

        .tags-container {
            scale: 0.8;
        }

        .globalwrapper {
            background-size: contain;
        }
    }
</style>
