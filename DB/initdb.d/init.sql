CREATE TABLE Usuarios (
    Id INT PRIMARY KEY AUTO_INCREMENT,  
    Nombre VARCHAR(100) NOT NULL,      
    Contraseña VARCHAR(100) NOT NULL,  
    Numero VARCHAR(15)                  
);


CREATE TABLE Reservas (
    Id INT PRIMARY KEY AUTO_INCREMENT,  
    Fecha DATE NOT NULL,                
    Hora TIME NOT NULL,                
    numPersonas INT NOT NULL,          
    idCliente INT,                    
    FOREIGN KEY (idCliente) REFERENCES Usuarios(Id)  
);
