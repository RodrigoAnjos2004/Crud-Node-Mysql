DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADDouEditar`(
IN _MatriculaID INT,
IN _CPF varchar(11),
IN _Nome varchar(45),
IN _idade int
)
BEGIN 
	IF _MatriculaID = 0 THEN
		INSERT INTO Crud(CPF,Nome,idade)
        VALUES (_CPF,_Nome,_idade);
        
        SET _MatriculaID = LAST_INSERT_ID();
	ELSE
		UPDATE Crud
        SET 
        CPF = _CPF,
        Nome = _Nome,
        Idade = _idade
        WHERE MatriculaID = _MatriculaID;
	END IF;
    
SELECT _MatriculaID AS 'MatriculaID';

END$$
DELIMITER ;
