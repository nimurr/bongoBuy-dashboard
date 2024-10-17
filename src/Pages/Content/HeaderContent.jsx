export default function HeaderContent() {
  return (
    <div>
      <h2 className="text-3xl font-semibold dark:text-white mb-10">
        Header content
      </h2>
      <form action="" className="grid bg-white dark:bg-gray-800 p-5 rounded grid-cols-2 gap-5">
        <div >
          <span className="mb-2 block dark:text-white">Header Hading</span>
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              name="mainmenu"
              className="bg-transparent p-2 w-full  border rounded dark:text-white"
              id=""
              placeholder="Header Hading"
            />
          </div>
        </div>
        <div >
          <span className="mb-2 block dark:text-white">Header Description</span>
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              name="mainmenu"
              className="bg-transparent p-2 w-full  border rounded dark:text-white"
              id=""
              placeholder="Header Description"
            />
          </div>
        </div>
        <div>
            <button type="submit" className="p-2 w-full text-white bg-blue-600 rounded">Submit</button>
        </div>
      </form>
    </div>
  );
}
