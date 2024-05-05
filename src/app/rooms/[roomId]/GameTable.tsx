import React from 'react'

export const GameTable = () => {
    return (
        <div className="w-2/5 rounded-3xl p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 ">
            <div className="rounded-[calc(1.5rem-1px)] p-10 bg-white dark:bg-gray-900 flex items-center justify-center">
                <p className="text-gray-700 dark:text-gray-300">Pick your cards!</p>
            </div>
        </div>
    )
}
