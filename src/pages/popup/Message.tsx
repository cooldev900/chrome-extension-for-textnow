const Message = ({ setMessageTemplate }: { setMessageTemplate: (value: string) => void }) => {
    return <div className="w-full relative float-label-input">
        <textarea id="name" rows={4} className="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400 text-black" onChange={(e) => setMessageTemplate(e.target.value)} />
        <label htmlFor="name" className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker">Message Template</label>
    </div>
}

export default Message;