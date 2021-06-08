import React from 'react'
import Table from 'react-bootstrap/Table'

export default function TableFunc(props){

    return (
        <div>
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
                    {props.funcionarios.map((funcionario, index) => {
                        return (
                            <tr>
                                <td>{index}</td>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.email}</td>
                                <td>{funcionario.setor}</td>
                                <td>
                                    <button className="btn btn-warning" title='Editar' 
                                    onClick={
                                        () => {
                                            props.editar(index, funcionario.nome, funcionario.email, funcionario.setor)
                                        }
                                    }>
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' 
                                    onClick={
                                        () => {
                                            props.excluir(index)
                                        }
                                    }>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
        </div>
    )
}