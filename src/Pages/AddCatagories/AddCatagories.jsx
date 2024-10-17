export default function AddCatagories() {
  return (
    <div>
      <h2 className="text-2xl font-semibold dark:text-white">Add Catagories</h2>
      <form className="sm:flex items-center my-10" action="">
        <input
          className="border-0 sm:min-w-48 w-full pr-20"
          type="text"
          placeholder="Add Categories"
        />
        <button className="p-2 sm:w-auto min-w-48 w-full text-cneter bg-primary text-white font-semibold border-0">
          Add Categories
        </button>
      </form>
      <div className="grid xl:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 justify-between gap-2">
        {Array.from({ length: 10 }).map((_, idx) => (
          <span key={idx} className="bg-gray-500 py-2 px-5 text-white">
            Categories {idx + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
