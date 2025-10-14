// import React, { useState } from "react";
// import NavBar from "../../Componentes/NavBar";
// import Futter from "../../Componentes/Futter";
// import Button from "../../Componentes/Button/button";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../fireBase";

// const DashBoard = () => {
//   let [Todo, setTodo] = useState("");
//   let [resetTodo, setResetTodo] = useState([]);
//   // useEffect(()=> addTodo(),[])

//   const allFilters = ["All", "Active", "Completed"];

//   const addTodo = async () => {
//     console.log("Todo", Todo);
//     console.log("resetTodo", resetTodo);

//     localStorage.getItem("userUid");
//     try {
//       const docRef = await addDoc(collection(db, "todos"), { Todo });
//       let id = docRef.id;
//       setResetTodo([...resetTodo, { id, Todo }]);    
//       setTodo("");
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   return (
//     <>
//       <NavBar />
//       <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-6">
//         <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-6">
//           {/* Header */}
//           <h1 className="text-2xl font-bold mb-6 text-center">📝 To-Do List</h1>

//           {/* Input row */}
//           <div className="flex gap-3 mb-6">
//             <input
//               type="text"
//               placeholder="Add a new task..."
//               onChange={(e) => setTodo(e.target.value)}
//               className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={Todo}
//             />
//             <Button
//               className="w-auto px-4 py-2"
//               text={"Add"}
//               onClick={addTodo}
//             />
//           </div>

//           {/* Filters */}

//               <div className="flex items-center justify-between text-sm mb-6">
//           {
//             allFilters.map(value ,id)(
//             <div className="flex gap-2" key={id} >
//               <button className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600">
//                 { value }
//               </button>
//               <button className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600">
//                 Active
//               </button>
//               <button className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600">
//                 Completed
//               </button>
//             </div>
//           )
//         }
//             <span className="text-gray-400">3 tasks</span>
//           </div>
//           {/* Task list */}
//           {resetTodo.map((value) => (
//             <div className="space-y-3" key={value.id}>
//               <li className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-3">
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="checkbox"
//                     className="h-5 w-5 accent-indigo-600"
//                   />

//                   <span className="text-sm">{value.Todo}</span>
//                 </div>
//                 <button className="text-red-400 hover:text-red-500">✖</button>
//               </li>
//               {/* <li className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-3 opacity-70">
//             <div className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 checked
//                 readOnly
//                 className="h-5 w-5 accent-indigo-600"
//                 />
//               <span className="text-sm line-through text-gray-400">
//                 Write blog post
//               </span>
//             </div>
//             <button className="text-red-400 hover:text-red-500">✖</button>
//             </li> */}

//               {/* <li className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-3">
//             <div className="flex items-center gap-3">
//             <input type="checkbox" className="h-5 w-5 accent-indigo-600" />
//               <span className="text-sm">Refactor code</span>
//             </div>
//             <button className="text-red-400 hover:text-red-500">✖</button>
//             </li> */}
//             </div>
//           ))}
//           {/* Footer */}
//           <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
//             <span>Showing 2 of 3 tasks</span>
//             <button className="hover:text-gray-200">Clear Completed </button>
//           </div>
//         </div>
//       </div>
//       <Futter />
//     </>
//   );
// };

// export default DashBoard;
