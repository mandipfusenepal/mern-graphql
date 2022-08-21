import React from 'react'
import AddClientModal from '../components/AddClientModal'
import AddProjectModal from '../components/AddProjectModal'
import Client from '../components/Client'
import Project from '../components/Project'

export default function Home() {
    return (
        <>
            <div className="d-flex gap-3 mb-3">
                <AddProjectModal/>
                <AddClientModal />
            </div>
            <Project />
            <hr />
            <Client />
        </>
    )
}
