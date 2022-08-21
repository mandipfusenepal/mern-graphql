import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../queries/projectMutations";

export default function EditProjectForm({ project }) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        if (!name || !description || !status) {
            return alert('Please fill all fields');
        }

        updateProject(name, description, status);
    };

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { name, description, status, id: project.id },
        refetchQueries: [{ query: GET_PROJECTS, variables: { id: project.id } }],

    });

    return (
        <div className="mt-5">
            <h3>Update Project Details</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="description">Description:</label>
                    <textarea name="description"
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="status">Status:</label>
                    <select name="status" id="status" className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
