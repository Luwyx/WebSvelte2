import { json } from '@sveltejs/kit';
import fs from 'fs';

const counterFile = 'counter.json';

const initializeCounterFile = () => {
    try {
        if (!fs.existsSync(counterFile)) {
            fs.writeFileSync(counterFile, JSON.stringify({ counter: 0 }));
            console.log('Counter file created successfully.');
        }
    } catch (error) {
        console.error('Error initializing counter file:', error);
    }
};

initializeCounterFile();

const getCounterValue = () => {
    try {
        const data = fs.readFileSync(counterFile);
        const jsonContent = JSON.parse(data);
        return jsonContent.counter;
    } catch (error) {
        console.error('Error reading counter file:', error);
        return 0; // Return default value if error occurs
    }
};

const setCounterValue = (value) => {
    try {
        fs.writeFileSync(counterFile, JSON.stringify({ counter: value }));
    } catch (error) {
        console.error('Error writing counter file:', error);
    }
};

const incrementCounter = () => {
    let counter = getCounterValue();
    counter += 1;
    setCounterValue(counter);
    return counter;
};

const resetCounter = () => {
    setCounterValue(0);
    return 0;
};

export function GET() {
    const counter = getCounterValue();
    return json({ counter });
}

export async function POST({ request }) {
    const { action } = await request.json();
    let counter;

    if (action === 'increment') {
        counter = incrementCounter();
    } else if (action === 'reset') {
        counter = resetCounter();
    }

    return json({ counter });
}
