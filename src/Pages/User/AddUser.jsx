export default function AddUser() {
  return (
    <div className="px-10">
      <h2 className="text-3xl dark:text-white text-center">Add User</h2>
      <form
        className="sm:w-[500px] mx-auto w-full  bg-white dark:bg-gray-800 p-5 rounded-md mt-10 shadow-xl"
        action=""
      >
        <span className="dark:text-white">Email Address</span>
        <input
          type="email"
          className="w-full border-1 border-gray-300 rounded-md mt-1 bg-transparent dark:text-gray-200"
          placeholder="Enter Email Address "
        />
        <div className="my-3">
          <span className="dark:text-white">Role</span>
          <select
            className="w-full border-1 border-gray-300 rounded-md  mt-1 bg-transparent dark:text-gray-200"
            name=""
            id=""
          >
            <option className="text-black" value="">Admin</option>
            <option className="text-black" value="">Moderator</option>
          </select>
        </div>
        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Add Member
        </button>
      </form>
    </div>
  );
}
