import React, { useState } from 'react';

const CodeGenerator = () => {
    const [language, setLanguage] = useState('JavaScript');
    const [code, setCode] = useState('');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const generateCode = () => {
        switch (language) {
            case 'JavaScript':
                return `console.log('Hello World');`;
            case 'Python':
                return `print('Hello World')`; 
            case 'Java':
                return `System.out.println('Hello World');`;
            default:
                return '';
        }
    };

    return (
        <div>
            <h1>Code Generator</h1>
            <select onChange={handleLanguageChange} value={language}>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
            </select>
            <textarea
                onChange={handleCodeChange}
                value={code}
                placeholder="Write your code here..."
                rows={10}
                style={{ width: '100%' }}
            />
            <button onClick={() => setCode(generateCode())}>Generate Code</button>
            <pre>{code}</pre>
        </div>
    );
};

export default CodeGenerator;