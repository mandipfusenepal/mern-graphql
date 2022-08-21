import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import { ADD_PROJECT } from "../queries/projectMutations";

export default function AddProjectModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new');

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] }
            });
        }
    });

    // Get Clients form select
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name || !description || !status) {
            return alert("All fields are required");
        }

        addProject(name, description, clientId, status);

        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    }

    if (loading) return null;
    if (error) return <p>Something went wrong.</p>

    return (
        <>
            {!loading && !error && (
                <>
                    <button type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addProjectModal">
                        <div className="d-flex align-items-center">
                            <FaList className="icon" />
                            <div>Add Project</div>
                        </div>
                    </button>

                    <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addProjectModalLabel">Add Project Form</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
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
                                        <div className="mb-3">
                                            <label htmlFor="clientId" className="form-label">Client</label>
                                            <select name="clientId"
                                                id="clientId"
                                                className="form-control"
                                                value={clientId}
                                                onChange={e => setClientId(e.target.value)}>
                                                <option value="">Select Client</option>
                                                {data.clients.map(client => (<option value={client.id}>{client.name}</option>))}
                                            </select>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => onSubmit(e)}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
