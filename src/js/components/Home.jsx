import React, { useEffect } from "react";
import { useState } from "react";

//create your first component
const Home = () => {

	const [todolist, setTodolist] = useState([])
	const [newTodo, setnewTodo] = useState("")
	const [ShowX, setShowX] = useState(null)

	const handlePressKey = (e) => {

		if (e.key === "Enter") {
			fetch("https://playground.4geeks.com/todo/todos/ale_sced", {
				method: "POST",
				body: JSON.stringify( { "label": newTodo, "is_done": false }),
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then((response) => response.json())
			.then((data) => console.log(data))

			setnewTodo("")

			fetch("https://playground.4geeks.com/todo/users/ale_sced")
				.then((response) => response.json())
				.then((data) => setTodolist(data.todos))
		}
	}

	const handleDelete = (IdToDelete) => {
		fetch("https://playground.4geeks.com/todo/todos/" + IdToDelete, {
			method: "DELETE",
			})
		.then((response) => {
			if (response.ok) {
				alert("Todo deleted successfully");

				 return fetch("https://playground.4geeks.com/todo/users/ale_sced")
                    .then((response) => response.json())
                    .then((data) => setTodolist(data.todos));
            }
        })
        .catch((error) => {
            console.error("Error al eliminar el todo:", error);
        });
	}

	const panic = () => {
		fetch("https://playground.4geeks.com/todo/users/ale_sced", {
			method: "DELETE",
		})
			.then((response) => {
				if (response.ok) {
					console.log("All todos deleted successfully");
					fetch("https://playground.4geeks.com/todo/users/ale_sced", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						}
					})
				}
			})
			.then(() => {
			fetch("https://playground.4geeks.com/todo/users/ale_sced")
				.then((response) => response.json())
				.then((data) => setTodolist(data.todos))
		})

	}
	


	useEffect(() => {
		fetch("https://playground.4geeks.com/todo/users/ale_sced")
		.then((response) => response.json())
		.then((data) => setTodolist(data.todos));

	}, []);

	return (
		<div className="container">
			<div className="Titulo">Todos</div>
			<div className="contenedor-todo-list">
				<ul>
					<li>
						<input 
						type="text" 
						placeholder="What's to be done?"
						value = {newTodo}
						onChange={(e) => setnewTodo(e.target.value)}
						onKeyDown={handlePressKey}
						/>
					</li>
					{
						todolist.map((todo) => (

							<li 
								key={todo.id}
								onMouseOver={() => setShowX(todo.id)}
								onMouseLeave={() => setShowX(null)} >
								{todo.label}
								{ShowX === todo.id && <small onClick={() => handleDelete(todo.id)}><i className="fa-solid fa-trash"></i></small>}
							</li>
						))
					}
					<li>{todolist.length === 0 ? " You don't have work to do! " : todolist.length + ' works to do '}</li>
				</ul>
			</div> 
			<button className="btn btn-danger" onClick={() => panic()}>Delete</button>
		</div>
	);
};


export default Home;