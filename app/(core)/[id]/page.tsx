

type PageProps = {
  params: Promise<{ id: string }>;
};

const Chat = async ({params} : PageProps) => {

    const { id } = await params

    console.log(id)
  return (
    <div className="border w-full">
      test {id}
    </div>
  )
}

export default Chat
