import React from 'react'
import Table from 'react-bootstrap/Table'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

export default function TableFunc(props){

    return (
        <div>
            <Form inline onSubmit={props.handleSearch}>
                <FormControl name='search' type="text" placeholder="Search" className=" mr-sm-2" />
                <Button type="submit">Buscas</Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Setor</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.funcionarios.length ? 
                        props.funcionarios.map((funcionario, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{funcionario.nome}</td>
                                    <td>{funcionario.email}</td>
                                    <td>{funcionario.setor}</td>
                                    <td>
                                        <button className="btn btn-warning" title='Editar' 
                                        onClick={
                                            () => props.editar(funcionario.id, funcionario.nome, funcionario.email, funcionario.setor)
                                        }>
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' 
                                        onClick={() => props.excluir(funcionario.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        null
                    }
                </tbody>
            </Table>
        </div>
    )
}