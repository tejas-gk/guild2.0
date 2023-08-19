import React, { useState } from 'react';
// import TextareaAutoSize from 'react-textarea-autosize'

export default function index() {
    const [text, setText] = useState('');
    const handleChange = (event) => {
        setText(event.target.value);
    };

    // Function to format the selected text with given style
    const formatText = (style) => {
        const selectionStart = event.target.selectionStart;
        const selectionEnd = event.target.selectionEnd;
        const selectedText = text.substring(selectionStart, selectionEnd);

        let newText;

        if (style === 'bold') {
            newText = `**${selectedText}**`;
        } else if (style === 'italic') {
            newText = `_${selectedText}_`;
        } else {
            return;
        }

        const updatedText =
            text.substring(0, selectionStart) +
            newText +
            text.substring(selectionEnd);

        setText(updatedText);
    };
    return (
        <div>
            <div
                className='flex
            flex-row
            items-center
            gap-4
            p-4
          '
            >
                <h1
                    className='
                text-4xl
                font-bold
                text-gray-800
              '
                >
                    Create Post
                </h1>
                <div
                    className='
                text-md
                font-medium
                text-gray-500
              '
                >
                    in /r/nextjs
                </div>
            </div>
            {/* editor */}
            <div
                className='
          w-full
          p-4
          bg-zinc-50
            rounded-md
            border border-zinc-200
          '
            >
                <form className='w-fit'>
                    <div
                        className='
                    
                  '
                    >
                        <textarea
                            onChange={handleChange}
                            placeholder='Create Post'
                            className='
                            w-full
                            resize-none
                            bg-transparent
                            outline-none
                            border-none
                            appearance-none
                            text-4xl
                            overflow-hidden
                            font-bold
                            focus:outline-none
                          '
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
