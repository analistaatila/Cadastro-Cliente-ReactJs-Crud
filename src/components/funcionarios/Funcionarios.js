import React, { useEffect } from 'react'
import {useState} from 'react'
import './Funcionarios.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import TableFunc from './TableFunc'
import http from '../../http-common'
import { NotificationContainer, NotificationManager } from 'react-notifications'

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
    const [listaFuncionarios, setListaFuncionarios] = useState({})

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
        http.delete(`funcionario/${index}`)
        .then(()=>{
            NotificationManager.success('Excluido', 'Excluido')
            loadList()
        })
        .catch(error=>{
            NotificationManager.warning('Erro', error)
        })
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
        if(nome == '' || email == '' || setor == '')
            NotificationManager.warning('Erro', "Campos não preenchidos")
        else{
            const pessoa = {
                nome: nome,
                email: email,
                setor: setor
            }

            http.put(`funcionario/${index}`, pessoa)
            .then(()=>{
                loadList()
            })
            .catch(error=>{
                NotificationManager.warning('Erro', error)
            })
            handleCloseEditor()
        }
    }

    function loadList(){
        http.get("funcionario/")
        .then(lista => {
            setListaFuncionarios(lista.data)
        })
        .catch(error=>{
            NotificationManager.warning('Erro', error)
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(nome == '' || email == '' || setor == '')
            NotificationManager.warning('Erro', "Campos não preenchidos")
        else{
            const pessoa = {
                nome: nome,
                email: email,
                setor: setor
            }

            http.post("funcionario/",pessoa)
            .then((pessoa)=>{
                const newPessoa = pessoa.data
                setListaFuncionarios([...listaFuncionarios, newPessoa])
                NotificationManager.success('Adicionado', "Adiconado com sucesso")
            })
            .catch(error=>{
                NotificationManager.warning('Erro', error)
            })
            handleClose()
            clearFields()
        }
    }

    const handleSearch  = (e) => {
        e.preventDefault()
        const nome = e.target.search.value

        if (nome != ""){
            http.get(`funcionario/?nome=${nome}`)
            .then((pessoas) => {
                setListaFuncionarios(pessoas.data)
                console.log(listaFuncionarios)
            })
            .catch(error=>{
                NotificationManager.warning('Erro', error)
            })
        }else
            loadList()
    }

    useEffect(()=>{
        loadList()
    },[])

    return (
        <div>
            <h1>Funcionarios</h1>
            <div className='divHeader'>
                <Button variant="primary" onClick={handleShow}>
                    Cadastrar
                </Button>
            </div>

            <TableFunc handleSearch={handleSearch} editar={editar} excluir={excluir} funcionarios={listaFuncionarios}/>

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
                        <Button variant="secondary" onClick={handleClose}>
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