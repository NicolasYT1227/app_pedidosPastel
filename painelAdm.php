<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Painel de ADM</title>

    <link rel="icon" href="https://static.vecteezy.com/system/resources/previews/000/288/903/original/administration-vector-icon.jpg">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <link rel="stylesheet" href="css/admPanel.css">
</head>
<body>
    <div class="box">

        <!--Start Modal-Menu-->
        <aside>
            <div class="toggle">
                <div class="logo">
                    <img src="https://logodix.com/logo/383837.jpg">
                    <h2>NCoding</h2>
                </div>
                <div class="close" id="close-btn">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
            </div>

            <div class="modal-menu">
                <a href="#">
                    <span class="material-symbols-outlined">
                        menu
                    </span>
                    <h3>Mais Opções</h3>
                </a>
                <a href="#" class="active">
                    <span class="material-symbols-outlined">
                        insights
                    </span>
                    <h3>Analyses</h3>
                </a>
                <a href="#">
                    <span class="material-symbols-outlined">
                        person
                    </span>
                    <h3>Funcionários</h3>
                </a>
                <a href="#" id="vendas">
                    <span class="material-symbols-outlined" id="btn-sell" data-target="area-venda">
                        local_atm
                    </span>
                    <h3>Vendas</h3>
                </a>
                <a href="#">
                    <span class="material-symbols-outlined">
                        add
                    </span>
                    <h3>Novo login</h3>
                </a>
                <a href="#" id="userBtn">
                    <span class="material-symbols-outlined">
                        settings
                    </span>
                    <h3>Conta</h3>
                </a>
                <a href="destroyLogout.php" class="submit">
                    <span class="material-symbols-outlined">
                        logout
                    </span>
                    <h3>Sair</h3>
                </a>

            </div>
        </aside>
        <!--End Modal-Menu-->
   
        <!--Analyses-->
        <main>
                <h1>Estatísticas</h1>
                 <!-- Analyses -->
                 <div class="analyse">
                    <div class="sales">
                        <div class="status">
                            <div class="info">
                                <h3>Total de vendas</h3>
                                <h1>R$2500,00</h1>
                            </div>
                            <div class="progresss">
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div class="percentage">
                                    <p>+81%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="visits">
                        <div class="status">
                            <div class="info">
                                <h3>Lucro</h3>
                                <h1>R$1300,00</h1>
                            </div>
                            <div class="progresss">
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div class="percentage">
                                    <p>+52%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="searches">
                        <div class="status">
                            <div class="info">
                                <h3>Prejuízo</h3>
                                <h1>R$1200,00</h1>
                            </div>
                            <div class="progresss">
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div class="percentage">
                                    <p>-48%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--End Analyses-->

                <div class="new-users">
                    <h2>Novos usuários</h2>
                    <div class="user-list">
                        <div class="user">
                            <img src="image/img-user.jpg">
                            <h2>Regina</h2>
                        </div>
                        <div class="user">
                            <img src="image/img-user.jpg">
                            <h2>Samara</h2>
                        </div>
                        <div class="user">
                            <img src="image/addUserButton.jpg">
                            <h2>Novo usuário</h2>
                            <a href="">
                                <span class="modalUserRegis"></span>
                                <div class="newUsers">
                                    <div class="newUserRegis">
                                        <label for="img">Imagem</label>
                                        <input type="img" name="image" class="inputImgModal" id="modalNewUser">
                                    </div>
                                    <div class="newUserRegis">
                                        <label for="name">Nome</label>
                                        <input type="text" name="nome" class="inputNameModal" id="modalNewUser">
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!--End Users-->
                <div class="vendas">
                    <h2>Vendas</h2>
                    <table>
                        <thead>
                            <th>Nome</th>
                            <th>Número</th>
                            <th>Pagamento</th>
                            <th>Status</th>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <a href="#">Ver mais</a>
                </div>
        </main>
        <!--End Analyses-->
    </div>
    <!--End main options-->

    <section id="area-vendas">
        
    </section>

    <div class="right-section">
        <div class="nav">
            <button id="menu-btn">
                <span class="material-icons-sharp">
                    menu
                </span>
            </button>
            <div class="dark-mode">
                <span class="material-symbols-outlined">
                    light_mode
                </span>
            </div>
            <div class="dark-mode">
                <span class="material-symbols-outlined">
                    dark_mode
                </span>
            </div>
        </div>
    </div>

    <script src="js/admConfig.js"></script>
</body>
</html>