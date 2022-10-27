import { useEffect, useState } from 'react'
import Button from './components/Button'
import Card from './components/Card'
import Input from './components/Input'
import PageComponent from './components/PageComponent'
import Select from './components/Select'
import './styles/App.css'

function App() {

  const contries = [
    {
      value: "Catar",
      key: "Cat",
    },
    {
      value: "Equador",
      key: "Equ",
    },
    {
      value: "Holanda",
      key: "Hol",
    },
    {
      value: "Senegal",
      key: "Sen",
    },
    {
      value: "Estados Unidos",
      key: "Eua",
    },
    {
      value: "Inglaterra",
      key: "Ing",
    },
    {
      value: "Irã",
      key: "Ira",
    },
    {
      value: "País de Gales",
      key: "Gal",
    },
    {
      value: "Argentina",
      key: "Arg",
    },
    {
      value: "México",
      key: "Mex",
    },
    {
      value: "Polônia",
      key: "Pol",
    },
    {
      value: "França",
      key: "Fra",
    },
    {
      value: "Dinamarca",
      key: "Din",
    },
    {
      value: "Tunísia",
      key: "Tun",
    },
    {
      value: "Austrália",
      key: "Aus",
    },
    {
      value: "Espanha",
      key: "Esp",
    },
    {
      value: "Alemanha",
      key: "Ale",
    },
    {
      value: "Japão",
      key: "Jap",
    },
    {
      value: "Costa Rica",
      key: "Cos",
    },
    {
      value: "Bélgica",
      key: "Bel",
    },
    {
      value: "Canadá",
      key: "Can",
    },
    {
      value: "Marrocos",
      key: "Mar",
    },
    {
      value: "Croácia",
      key: "Cro",
    },
    {
      value: "Brasil",
      key: "Bra",
    },
    {
      value: "Sérvia",
      key: "Ser",
    },
    {
      value: "Suíça",
      key: "Sui",
    },
    {
      value: "Camarões",
      key: "Cam",
    },
    {
      value: "Portugal",
      key: "Por",
    },
    {
      value: "Gana",
      key: "Gan",
    },
    {
      value: "Uruguai",
      key: "Uru",
    },
    {
      value: "Coréia do Sul",
      key: "Cor",
    }
  ]

  const [isBetsCreated, setIsBetCreated] = useState(false)
  const [isAddGuess, setIsAddGuess] = useState(false)
  const [isEditGuess, setIsEditGuess] = useState(false)
  const [editGuessIndex, setEditGuessIndex] = useState()
  const [isEditBetsGroup, setIsEditBetsGroup] = useState(false)
  const [isSetFinalScore, setIsSetFinalScore] = useState(false)
  const [isOpenGuess, setIsOpenGuess] = useState(true)
  const [betsData, setBetsData] = useState()

  const handleUpdate = (event) => {
    event.preventDefault()

    if (event.target[0].value == "" || event.target[0].value == "") {
      if (confirm("Deseja remover esse palpite?")) {

        console.log("ANTES", betsData.participants)
        betsData.participants.splice(editGuessIndex, 1)
        console.log("DEPOIS", betsData.participants)


        localStorage.setItem("bets", JSON.stringify(betsData))
        setBetsData(betsData)

        setIsEditGuess(false)
        return
      }
    } else {
      const data = {
        ...betsData.participants[editGuessIndex],
        guessScoreHomeTeam: event.target[0].value,
        guessScoreVisitorsTeam: event.target[1].value,
      }

      betsData.participants[editGuessIndex] = data

      localStorage.setItem("bets", JSON.stringify(betsData))
      setBetsData(betsData)

      setIsEditGuess(false)
      return
    }
  }

  const handleSetFinalScore = (event) => {
    event.preventDefault()
    betsData.finalScoreHomeTeam = event.target[0].value
    betsData.finalScoreVisitorsTeam = event.target[1].value

    localStorage.setItem("bets", JSON.stringify(betsData))
    setBetsData(betsData)
    setIsSetFinalScore(false)
  }

  const handleAddGuess = (event) => {
    event.preventDefault()

    const data = {
      name: event.target[0].value,
      guessScoreHomeTeam: event.target[1].value,
      guessScoreVisitorsTeam: event.target[2].value,
    }

    const newBetsData = { ...betsData }
    newBetsData.participants.push(data)

    localStorage.setItem("bets", JSON.stringify(newBetsData))
    setBetsData(newBetsData)

    setIsAddGuess(false)
  }

  const handleFinalizeGuess = () => {
    betsData.isFinalizedGuess = true
    localStorage.setItem("bets", JSON.stringify(betsData))
    setBetsData(betsData)
    setIsOpenGuess(false)
  }

  const handleSaveDataForm = (event) => {
    event.preventDefault();

    const data = {
      owner: event.target[0].value,
      betsGroupName: event.target[1].value,
      betValue: event.target[2].value,
      homeTeam: event.target[3].value,
      visitorsTeam: event.target[4].value,
      finalScoreHomeTeam: "",
      finalScoreVisitorsTeam: "",
      password: event.target[5].value,
      isFinalizedGuess: false,
      participants: [
        {
          name: event.target[0].value,
          guessScoreHomeTeam: "",
          guessScoreVisitorsTeam: "",
        }
      ]
    }

    setBetsData(data)
    setIsBetCreated(true)
    localStorage.setItem("bets", JSON.stringify(data))
  }

  useEffect(() => {

    const req = localStorage.getItem("bets")

    setIsBetCreated(req !== null)

    if (req !== null) {
      const res = JSON.parse(req)

      console.log(res)
      setBetsData(res)
      setIsOpenGuess(!res.isFinalizedGuess)
    }

  }, [])

  return (
    <PageComponent>
      {
        isBetsCreated ? (
          <Card>
            <h1>Bolão {betsData.betsGroupName}</h1>
            <div style={{
              display: "flex",
              gap: 16,
              alignItems: "center"
            }}>
              <p>
                <b>Criado por:</b> {betsData.owner}
              </p>

              <p>
                <b>Valor da aposta:</b> R$ {betsData.betValue}
              </p>
            </div>
            <div style={{
              display: "flex",
              gap: 16,
              alignItems: "center"
            }}>
              <div style={{
                display: "flex",
                gap: 16,
                alignItems: "center"
              }}>
                <strong>{betsData.homeTeam}</strong>
                <img height={50} src={`./assets/${betsData.homeTeam.toLowerCase()}.svg`} alt={betsData.homeTeam} />
                <input style={{
                  width: "3.2rem",
                  height: '3.2rem',
                  borderRadius: "8px",
                  border: "1px solid #0000004d",
                  textAlign: "center",
                  fontWeight: "bold"
                }} disabled value={betsData.finalScoreHomeTeam} />
              </div>
              <h3>x</h3>
              <div style={{
                display: "flex",
                gap: 16,
                alignItems: "center"
              }}>
                <input style={{
                  width: "3.2rem",
                  height: '3.2rem',
                  borderRadius: "8px",
                  border: "1px solid #0000004d",
                  textAlign: "center",
                  fontWeight: "bold"
                }} disabled value={betsData.finalScoreVisitorsTeam} />
                <img height={50} src={`./assets/${betsData.visitorsTeam.toLowerCase()}.svg`} alt={betsData.visitorsTeam} />
                <strong>{betsData.visitorsTeam}</strong>
              </div>
            </div>

            {
              (betsData.participants.length < 10 && isOpenGuess) && (
                <Button onClick={() => setIsAddGuess(true)}>Adicionar palpites</Button>
              )
            }

            {
              isSetFinalScore && (
                <div style={{
                  position: "absolute",
                  zIndex: 100,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "#0000004D",
                  top: 0,
                  marginTop: "-12rem",
                  display: "flex",
                  alignItems: 'center',
                  justifyContent: "center"
                }}>
                  <Card>
                    <form onSubmit={handleSetFinalScore} style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      alignItems: "center"
                    }}>
                      <h2> Placar final </h2>
                      <div style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center"
                      }}>
                        <div style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "center"
                        }}>
                          <strong>{betsData.homeTeam}</strong>
                          <img height={25} src={`./assets/${betsData.homeTeam.toLowerCase()}.svg`} alt={betsData.homeTeam} />
                          <input
                            name="finalScoreHomeTeam" style={{
                              width: "3.2rem",
                              height: '3.2rem',
                              borderRadius: "8px",
                              border: "1px solid #0000004d",
                              textAlign: "center",
                              fontWeight: "bold"
                            }} />
                        </div>
                        <h3>x</h3>
                        <div style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "center"
                        }}>
                          <input
                            name="finalScoreVisitorsTeam" style={{
                              width: "3.2rem",
                              height: '3.2rem',
                              borderRadius: "8px",
                              border: "1px solid #0000004d",
                              textAlign: "center",
                              fontWeight: "bold"
                            }} />
                          <img height={25} src={`./assets/${betsData.visitorsTeam.toLowerCase()}.svg`} alt={betsData.visitorsTeam} />
                          <strong>{betsData.visitorsTeam}</strong>
                        </div>
                      </div>
                      <Button type={"submit"}>
                        Salvar
                      </Button>
                    </form>
                  </Card>
                </div>
              )
            }

            {
              isEditGuess && (
                <div style={{
                  position: "absolute",
                  zIndex: 100,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "#0000004D",
                  top: 0,
                  marginTop: "-16rem",
                  display: "flex",
                  alignItems: 'center',
                  justifyContent: "center"
                }}>
                  <Card>
                    <form onSubmit={handleUpdate} style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      alignItems: "center"
                    }}>
                      <h2> Editar palpite </h2>
                      <div style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center"
                      }}>
                        <div style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "center"
                        }}>
                          <strong>{betsData.homeTeam}</strong>
                          <img height={25} src={`./assets/${betsData.homeTeam.toLowerCase()}.svg`} alt={betsData.homeTeam} />
                          <input
                            name="guessScoreHomeTeam" style={{
                              width: "3.2rem",
                              height: '3.2rem',
                              borderRadius: "8px",
                              border: "1px solid #0000004d",
                              textAlign: "center",
                              fontWeight: "bold"
                            }} />
                        </div>
                        <h3>x</h3>
                        <div style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "center"
                        }}>
                          <input
                            name="guessScoreVisitorsTeam" style={{
                              width: "3.2rem",
                              height: '3.2rem',
                              borderRadius: "8px",
                              border: "1px solid #0000004d",
                              textAlign: "center",
                              fontWeight: "bold"
                            }} />
                          <img height={25} src={`./assets/${betsData.visitorsTeam.toLowerCase()}.svg`} alt={betsData.visitorsTeam} />
                          <strong>{betsData.visitorsTeam}</strong>
                        </div>
                      </div>
                      <Button type={"submit"}>
                        Salvar
                      </Button>
                    </form>
                  </Card>
                </div>
              )
            }

            {
              isAddGuess && (
                <div style={{
                  position: "absolute",
                  zIndex: 100,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "#0000004D",
                  top: 0,
                  marginTop: "-16rem",
                  display: "flex",
                  alignItems: 'center',
                  justifyContent: "center"
                }}>
                  <Card>
                    <form onSubmit={handleAddGuess} style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      alignItems: "center"
                    }}>
                      <h2> Adicionar palpite </h2>
                      <Input
                        name="name"
                        label="Nome completo"
                        placeholder="Digite seu nome..."
                        required
                      />
                      <div style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center"
                      }}>
                        <div style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "center"
                        }}>
                          <strong>{betsData.homeTeam}</strong>
                          <img height={25} src={`./assets/${betsData.homeTeam.toLowerCase()}.svg`} alt={betsData.homeTeam} />
                          <input
                            name="guessScoreHomeTeam" style={{
                              width: "3.2rem",
                              height: '3.2rem',
                              borderRadius: "8px",
                              border: "1px solid #0000004d",
                              textAlign: "center",
                              fontWeight: "bold"
                            }} />
                        </div>
                        <h3>x</h3>
                        <div style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "center"
                        }}>
                          <input
                            name="guessScoreVisitorsTeam" style={{
                              width: "3.2rem",
                              height: '3.2rem',
                              borderRadius: "8px",
                              border: "1px solid #0000004d",
                              textAlign: "center",
                              fontWeight: "bold"
                            }} />
                          <img height={25} src={`./assets/${betsData.visitorsTeam.toLowerCase()}.svg`} alt={betsData.visitorsTeam} />
                          <strong>{betsData.visitorsTeam}</strong>
                        </div>
                      </div>
                      <Button type={"submit"}>
                        Salvar
                      </Button>
                    </form>
                  </Card>
                </div>
              )
            }

            <table style={{ width: "100%" }}>
              <tbody>

                {
                  betsData.participants.map((participant, index) => (

                    <tr key={index}>
                      <td>
                        <div style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "center"
                        }}>
                          <img src="" alt="" />
                          <strong>{participant.name}</strong>
                        </div>
                      </td>
                      <td>
                        <div style={{
                          display: "flex",
                          gap: 4,
                          alignItems: "center"
                        }}>
                          <div style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center"
                          }}>
                            <strong>{betsData.homeTeam}</strong>
                            <img height={25} src={`./assets/${betsData.homeTeam.toLowerCase()}.svg`} alt={betsData.homeTeam} />
                            <input style={{
                              width: "3.2rem",
                              height: '3.2rem',
                              borderRadius: "8px",
                              border: "1px solid #0000004d",
                              textAlign: "center",
                              fontWeight: "bold"
                            }} disabled value={participant.guessScoreHomeTeam} />
                          </div>
                          <h3>x</h3>
                          <div style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center"
                          }}>
                            <input style={{
                              width: "3.2rem",
                              height: '3.2rem',
                              borderRadius: "8px",
                              border: "1px solid #0000004d",
                              textAlign: "center",
                              fontWeight: "bold"
                            }} disabled value={participant.guessScoreVisitorsTeam} />
                            <img height={25} src={`./assets/${betsData.visitorsTeam.toLowerCase()}.svg`} alt={betsData.visitorsTeam} />
                            <strong>{betsData.visitorsTeam}</strong>
                          </div>
                        </div>
                      </td>
                      <td>
                        {
                          isOpenGuess ? (
                            <Button onClick={() => {
                              setIsEditGuess(true)
                              setEditGuessIndex(index)
                            }}>
                              Editar
                            </Button>
                          ) : (
                            <>
                              {
                                betsData.finalScoreHomeTeam === '' || betsData.finalScoreVisitorsTeam === ''
                                  ? (
                                    <Button variant='Secondary'>
                                      Aguardando
                                    </Button>
                                  ) : (
                                    <Button variant={
                                      participant.guessScoreHomeTeam === betsData.finalScoreHomeTeam && participant.guessScoreVisitorsTeam === betsData.finalScoreVisitorsTeam ? "Primary" : "Error"
                                    }>
                                      {
                                        participant.guessScoreHomeTeam === betsData.finalScoreHomeTeam && participant.guessScoreVisitorsTeam === betsData.finalScoreVisitorsTeam ? "Ganhou" : "Perdeu"
                                      }
                                    </Button>
                                  )
                              }
                            </>
                          )
                        }
                      </td>
                    </tr>

                  ))
                }
              </tbody>

            </table>
            {
              isOpenGuess ? <Button onClick={handleFinalizeGuess}>Finalizar palpites</Button>
                : (
                  <>
                    {
                      betsData.finalScoreHomeTeam === '' || betsData.finalScoreVisitorsTeam === ''
                        ? <Button onClick={() => setIsSetFinalScore(true)}>Adicionar placar final</Button> :
                        <Button variant='Secondary' onClick={() => {
                          localStorage.removeItem("bets")
                          setBetsData(undefined)
                          setIsOpenGuess(true)
                          window.location.reload(false);
                        }}>Reiniciar bolão</Button>
                    }
                  </>
                )
            }
          </Card>
        ) : (
          <Card>
            <h1>Bem vindo ao Bolão app</h1>
            <h4>Digite os dados abaixo para criar seu bolão</h4>
            <form
              onSubmit={handleSaveDataForm}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                margin: "2rem 0 4rem",
                alignItems: "center",
                width: "100%",
              }}>
              <Input
                name="owner"
                label="Nome do administrador do bolão"
                placeholder="Digite seu nome..."
                required
              />
              <Input
                name="betsGroupName"
                label="Nome do bolão"
                placeholder="Digite o nome..."
                required
              />
              <Input
                name="betValue"
                label="Valor da aposta"
                type="number"
                placeholder="R$ 50,00"
                required
                helpText="Apenas numeros"
              />

              <Select
                name="homeTeam"
                label="Time da casa"
                placeholder="Selecione uma seleção..."
                options={contries}
                required
              />

              <Select
                name="visitorsTeam"
                label="Time visitante"
                placeholder="Selecione uma seleção..."
                options={contries}
                required
              />
              <Input
                name="password"
                label="Senha do bolão"
                type="password"
                required
              />
              <Button type="submit">
                Salvar dados
              </Button>
            </form>
          </Card>
        )
      }
    </PageComponent >
  )
}

export default App
