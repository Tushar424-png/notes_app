import { Fragment, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Sidebar } from "../component/navbar/sidebar";
import { NotesContext } from "../context/NotesContext";

export const Home = () => {
  const { state, dispatch } = useContext(NotesContext);

  const changeinput = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const submitdata = () => {
    dispatch({ type: "ADD_OR_UPDATE_NOTE" });
  };

  return (
    <Fragment>
      <Navbar />

      <main className="flex min-h-full gap-3">
        <Sidebar />

        {/* ADD / EDIT NOTE */}
        <div className="relative flex flex-col border border-sky-500 h-[200px] w-[250px] mt-20 ml-20 rounded-xl overflow-hidden shadow-sm">
          <div className="h-[66px] w-full border-b">
            <input
              className="h-full w-full px-3 outline-none"
              name="title"
              value={state.title}
              placeholder="Title"
              onChange={changeinput}
            />
          </div>

          <div className="h-[134px] w-full">
            <textarea
              className="h-full w-full px-3 py-2 outline-none resize-none"
              name="text"
              value={state.text}
              onChange={changeinput}
              placeholder="Type your note"
            />
          </div>

          {state.error && (
            <p className="text-red-500 text-sm px-2">{state.error}</p>
          )}

          <span
            onClick={submitdata}
            className="material-symbols-outlined absolute bottom-3 right-3 bg-sky-500 text-white p-2 rounded-full cursor-pointer hover:bg-sky-600"
          >
            {state.editId ? "check" : "add"}
          </span>
        </div>

        {/* NOTES LIST */}
        <div className="flex flex-wrap gap-3 mt-20 ml-20">
          {state.notes.map((note) => (
            <div
              key={note.id}
              className="relative flex flex-col border border-sky-500 h-[200px] w-[250px] rounded-xl overflow-hidden shadow-sm"
            >
              {/* DELETE */}
              <span
                onClick={() =>
                  dispatch({ type: "DELETE_NOTE", payload: note.id })
                }
                className="material-symbols-outlined absolute top-2 right-2 cursor-pointer text-red-500"
              >
                delete
              </span>

              {/* EDIT */}
              <span
                onClick={() =>
                  dispatch({ type: "EDIT_NOTE", payload: note })
                }
                className="material-symbols-outlined absolute top-2 right-10 cursor-pointer text-blue-500"
              >
                edit
              </span>

              <div className="h-[66px] w-full border-b">
                <h3 className="h-full w-full px-3 font-semibold">
                  {note.title}
                </h3>
              </div>

              {/* TEXT + PIN/ARCHIVE */}
              <div className="relative h-[134px] w-full">
                <p className="h-full w-full px-3 py-2">{note.text}</p>

                {/* ARCHIVE */}
                <span
                  onClick={() =>
                    dispatch({
                      type: "ARCHIVE_NOTE", // NotesContext me correct action
                      payload: note.id,
                    })
                  }
                  className="material-symbols-outlined absolute bottom-2 right-8 cursor-pointer text-gray-400"
                >
                  archive
                </span>

                {/* PIN */}
                <span
                  onClick={() =>
                    dispatch({
                      type: note.pinned ? "UNPIN_NOTE" : "PIN_NOTE",
                      payload: note.id,
                    })
                  }
                  className={`material-symbols-outlined absolute bottom-2 right-2 cursor-pointer ${
                    note.pinned ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  push_pin
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Fragment>
  );
};
