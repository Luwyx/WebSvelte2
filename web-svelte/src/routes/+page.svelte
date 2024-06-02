<script>
    import { onMount } from 'svelte';
    let counter = 0;

    const fetchCounter = async () => {
        const res = await fetch('/api/counter');
        const data = await res.json();
        counter = data.counter;
    };

    const incrementCounter = async () => {
        const res = await fetch('/api/counter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'increment' })
        });
        const data = await res.json();
        counter = data.counter;
    };

    const resetCounter = async () => {
        const res = await fetch('/api/counter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'reset' })
        });
        const data = await res.json();
        counter = data.counter;
    };

    onMount(fetchCounter);
</script>

<main> 
    <body>
        <div class="content-holder">
            <h1>Counter: {counter}</h1>
            <div class="button-holder">
                <button on:click={incrementCounter}>Increment</button>
                <button on:click={resetCounter}>Reset</button>
            </div>
            
        </div>
    </body>
    
</main>

<style>

    * {
        box-sizing: content-box;
        margin: 0px;
        padding: 0px;
    }

    main {
        text-align: center;
    }

    body {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000;
        height:100vh
    }
    
    .content-holder {
        background-color: white;
        width:fit-content;
        height: fit-content;
        padding: 25px;
        border-radius: 25px;
    }

    .button-holder {
        display: flex;
        gap: 25px;
    }

    button {
        border: solid 2px #000;
        background-color: white;
        color: #000;
        font-size: 1.2em;
        padding: 0.5em 1em;
        margin-top: 1em;
        border-radius: 10px;
    }
    button:hover {
        background-color: #000;
        color: #fff;

    }


    h1 {
        font-family: monospace;
        
    }
</style>
