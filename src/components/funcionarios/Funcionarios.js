import React, { useEffect } from 'react'
import {useState} from 'react'
import './Funcionarios.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import TableFunc from './TableFunc'

const Funcionarios = () => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showEditor, setShowEditor] = useState(false)
    const handleCloseEditor = () => setShowEditor(false)
    const handleShowEditor = () => setShowEditor(true) 

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [setor, setSetor] = useState('')
    const [index, setIndex] = useState(null)
    const [listaFuncionarios, setListaFuncionarios] = useState(JSON.parse(localStorage.getItem('listaFuncionarios')))

    function clearFields(){
        setNome('')
        setEmail('')
        setSetor('')
    }
       
    const HandleNome = (e) => {
        setNome(e.target.value)
    }
    
    const HandleEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const HandleSetor = (e) => {
        setSetor(e.target.value)
    }

    const excluir = (index) => {
        const newFuncionarios = listaFuncionarios
        newFuncionarios.splice(index, 1)
        setListaFuncionarios(newFuncionarios)
        localStorage.setItem("listaFuncionarios", JSON.stringify(listaFuncionarios))
    }

    const editar = (index, nome, email, setor) => {
        setNome(nome)
        setEmail(email)
        setSetor(setor)
        setIndex(index)
        handleShowEditor()
    }
    
    const atualizar = (e) => {
        e.preventDefault()
        const pessoa = {
            nome: nome,
            email: email,
            setor: setor
        }

        const newLista = listaFuncionarios
        newLista.splice(index, 1, pessoa)
        setListaFuncionarios(newLista)
        localStorage.setItem("listaFuncionarios", JSON.stringify(listaFuncionarios))
        handleCloseEditor()
        window.location.reload()
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(nome == '' || email == '' || setor == '')
            alert("Campos não preenchidos")
        else{
            const pessoa = [{
                nome: nome,
                email: email,
                setor: setor
            }]

            const unirVet = [].concat(listaFuncionarios, pessoa)
            setListaFuncionarios(unirVet)
            handleClose()
            clearFields()
        }
    }

    useEffect(()=>{
        localStorage.setItem('listaFuncionarios', JSON.stringify(listaFuncionarios))
    },[listaFuncionarios])

    return (
        <div>
            <h1>Funcionarios</h1>
            <div className='divHeader'>
                <Button variant="primary" onClick={handleShow}>
                    Cadastrar
                </Button>
            </div>

            {listaFuncionarios.length ?
                <TableFunc editar={editar} excluir={excluir} funcionarios={listaFuncionarios}/>
                :
                null
            }

            {/* Modal Adicionar */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={HandleNome}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={HandleEmail}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Setor</Form.Label>
                            <Form.Control as="select" custom onChange={HandleSetor}>
                                <option></option>
                                <option>Administrativo</option>
                                <option>Gerencia</option>
                                <option>Financeiro</option>
                                <option>Recursos Humanos</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="secondary" onClick={() => handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type='submit'>
                            Cadastrar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        
            {/* Modal Editar */}
            <Modal show={showEditor} onHide={handleCloseEditor}>
                <Modal.Header closeButton>
                    <Modal.Title>Editando</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={atualizar}>
                        <Form.Group>
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={HandleNome} value={nome}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={HandleEmail} value={email}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.SelectCustom">   
                        <Form.Label>Setor</Form.Label>
                            <Form.Control as="select" custom onChange={HandleSetor} defaultValue={setor}>
                                <option></option>
                                <option>Administrativo</option>
                                <option>Gerencia</option>
                                <option>Financeiro</option>
                                <option>Recursos Humanos</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="secondary" onClick={handleCloseEditor}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type='submit'>
                            Atualizar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default Funcionarios