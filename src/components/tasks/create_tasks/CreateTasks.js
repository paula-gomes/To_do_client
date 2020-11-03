import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

function CreateTask(props) {
	const [title, setTitle] = useState('');
	const [show, setShow] = useState('');
	const [priority, setPriority] = useState('');

	const handleSubmit = (async () => {
		await fetch(`http://localhost:3001/tasks`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					task: { title: title, done: false, priority: priority }
				})
			}
		)
		setShow(false)
		setTitle('')
		setPriority('High')
		props.loadTasks();
	});

	return (
		<div>
			<Button onClick={e => setShow(true)} variant="dark" className="float-right create_task_btn">+ Tasks</Button>

			<Modal show={show || false} onHide={e => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>New Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control type="email" placeholder="Enter with your task..." value={title || ''} onChange={e => setTitle(e.target.value)} />
					<Form>
						<Form.Group controlId="exampleForm.SelectCustom">
							<Form.Label>Priority</Form.Label>
							<Form.Control as="select" custom onChange={e => setPriority(e.target.value)} >
								<option>High</option>
								<option>Medium</option>
								<option>Low</option>								
							</Form.Control>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={e => setShow(false)}>
						Close
             </Button>
					<form onSubmit={handleSubmit}>
						<Button variant="dark" type="submit">
							Create
               </Button>
					</form>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateTask;