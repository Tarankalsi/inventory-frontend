import { ChangeEventHandler } from 'react'

export default function InputBox({ type, label, onChange }: { type: string, label: string, onChange: ChangeEventHandler<HTMLInputElement> }) {
    return (
        <div className='my-2'>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input
                onChange={onChange}
                type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
    )
}
