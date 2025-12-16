import { Fragment, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Sidebar } from "../component/navbar/sidebar";
import { NotesContext } from "../context/NotesContext";

export const Important = () => {
  const { state, dispatch } = useContext(NotesContext);

  return (
    <Fragment>
      <Navbar />

      <main className="flex min-h-full gap-3">
        <Sidebar />

        <div className="flex flex-wrap gap-3 mt-20 ml-20">
          {state.pinned.length === 0 && (
            <p className="text-gray-500 text-lg mt-10 ml-10">
              No important notes
            </p>
          )}

          {state.pinned.map((note) => (
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
              <span className="material-symbols-outlined absolute top-2 right-10 text-gray-400 cursor-not-allowed">
                edit
              </span>

              <div className="h-[66px] w-full border-b">
                <h3 className="h-full w-full px-3 font-semibold">
                  {note.title}
                </h3>
              </div>

              <div className="relative h-[134px] w-full">
                <p className="h-full w-full px-3 py-2">{note.text}</p>

                {/* UNPIN */}
                <span
                  onClick={() =>
                    dispatch({ type: "UNPIN_NOTE", payload: note.id })
                  }
                  className="material-symbols-outlined absolute bottom-2 right-2 cursor-pointer text-yellow-500"
                >
                  push_pin
                </span>

                {/* ARCHIVE */}
                <span className="material-symbols-outlined absolute bottom-2 right-10 text-gray-400 cursor-not-allowed">
                  archive
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Fragment>
  );
};
