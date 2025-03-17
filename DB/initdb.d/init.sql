CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    contacto VARCHAR(15)
);

CREATE TABLE Reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    numPersonas INT NOT NULL,
    nombreCliente VARCHAR(100) NOT NULL,
    contacto VARCHAR(15) NOT NULL,
    idCliente INT,
    FOREIGN KEY (idCliente) REFERENCES Usuarios(id)
);