<?php

/**
 * Handling database connection
 *
 */
class Db {

	private $conn;

	function __construct() {
		require_once 'includes/config.php';

        // Connecting to mysql database
		try {
  
			$this->conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);

			//this should be ERRMODE_SILENT
			$this->conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

		}catch(PDOException $e) {
			echo $e->getMessage();
		}
	}


	public function insert($table, $values){

		foreach($values as $k => $v ) {
			$prep[':'.$k] = $v;
		}
		try{
			$STH = $this->conn->prepare("INSERT INTO ".$table." ( " . implode(', ',array_keys($values)) . ") VALUES(" . implode(', ',array_keys($prep)) . ")");
			$STH->execute($values);
			return $this->conn->lastInsertId();
		}catch(PDOException $e) {
           // echo "Something went wrong. Try again later.";
			echo $e->getMessage();
            //file_put_contents('PDOErrors.txt', $e->getMessage(), FILE_APPEND);
		}
	}

	public function select($table, $id= ""){


		try{
			$query = "SELECT * FROM " . $table;

			if($id !== ""){
				$query.= " WHERE id=$id";
			}
			$STH = $this->conn->prepare($query);
			$STH->execute();
			$STH->setFetchMode(PDO::FETCH_ASSOC);
			return $STH->fetchAll();
		}catch(PDOException $e) {
           // echo "Something went wrong. Try again later.";
			echo $e->getMessage();
            //file_put_contents('PDOErrors.txt', $e->getMessage(), FILE_APPEND);
		}
	}
	public function search($table, $values){      

		try{
			$query = "SELECT * FROM " . $table . " WHERE ";
			foreach($values as $k => $v ) {
				$query.= $k . " LIKE :" . $k ." ";  
				$prep[$k] = "%". $v . "%";
			}
			$STH = $this->conn->prepare($query);
			$STH->execute($prep);
			$STH->setFetchMode(PDO::FETCH_ASSOC);
			return $STH->fetchAll();
		}catch(PDOException $e) {
           // echo "Something went wrong. Try again later.";
			echo $e->getMessage();
            //file_put_contents('PDOErrors.txt', $e->getMessage(), FILE_APPEND);
		}
	}

}