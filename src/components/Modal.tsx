import React, { useCallback } from 'react'
// import {
//     XMarkIcon
// } from '@heroicons/react/outline'
interface ModalProps {
    isOpen: boolean
    onClose: () => void
    onSend: () => void
    title: string
    body: string
    footer: string
    actionLabel: string
    disabled: boolean
}
export default function Modal({
    isOpen,
    onClose,
    onSend,
    title,
    body,
    footer,
    actionLabel,
    disabled
}: ModalProps) {
    const handleClose = useCallback(() => {
        if (disabled) return
        onClose()
    }, [disabled, onClose])

    const handleSend = useCallback(() => {
        if (disabled) return
        onSend()
    }, [disabled, onSend])

    if (!isOpen) return null
    return (
        <div className='
        flex
        justify-center
        items-center
        overflow-x-hidden overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-900
        bg-opacity-50

      '>
            <div className='
            relative
            w-full lg:w-3/6 lg:max-w-3xl h-full lg:h-auto
            my-6 mx-auto
            '>
                <div className='
                h-full lg:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
                '>
                    <div className='
                    flex
                    items-center
                    justify-between
                    p-10
                    rounded-t
                    '>
                        <h3 className='
                        text-3xl
                        font-semibold
                        text-neutral-900
                        '>
                            {title}
                        </h3>
                        <button
                            title='Close'
                        >
                            <div 
                                className='
                                h-6 w-6
                                text-neutral-900
                                hover:text-neutral-800
                                cursor-pointer
                                '
                                onClick={handleClose}
                            >
                                X
                            </div>

                        </button>
                        
                    </div>
                    <div className='
                    relative
                    p-10
                    flex-auto

                    '>
                        <p className='
                        my-4
                        text-neutral-900
                        text-lg
                        leading-relaxed
                        '>
                            {body}
                        </p>

                    </div>
                    {/* 
                    TODO: create a separate component for the button
                    */}
                    <div className='
                    flex
                    flex-col
                    gap-2 
                    p-10
                    '>
                        <button 
                            className='
                            bg-neutral-900
                            text-white
                            active:bg-neutral-700
                            text-sm
                            font-bold
                            uppercase
                            px-6
                            py-3
                            rounded
                            shadow
                            hover:shadow-lg
                            outline-none
                            focus:outline-none
                            mr-1
                            mb-1
                            ease-linear
                            transition-all
                            duration-150
                            '
                            type='button'
                            onClick={handleSend}
                        >
                            {actionLabel}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
