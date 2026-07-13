import React from 'react'

const InputMessage = () => {
  return (
    <div className="flex w-full gap-15 justify-between">
      <textarea
        className="text-xl font-bold ml-5 w-[80%] focus:outline-none resize-none wrap-break-words pt-1"
        rows={1}
      />
      <div className="flex bg-purple-900 px-3 py-1.5 rounded-full cursor-pointer">
        {'>'}
      </div>
    </div>
  )
}

export default InputMessage
