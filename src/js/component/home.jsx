import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import ToDoList from "./toDoList";

//create your first component
const Home = () => {
	return (
		<><div className="d-flex flex-column min-vh-100">
			<h1 className="d-flex flex-column align-items-center justify-content-center title">todos</h1>
			<ToDoList/>
			<footer className="footer mt-auto py-3 bg-light text-center">
                <div className="container">
                    <span className="text-muted">© 2024 Your Company. All rights reserved.</span>
                </div>
            </footer>			
		</div>
		</>
	);
};

export default Home;
