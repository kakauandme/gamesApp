<?php 
require_once 'includes/api.php';
require_once 'includes/db.php';
class MyAPI extends API
{
    protected $User;

    public function __construct($request, $origin) {
        parent::__construct($request);

        // $APIKey = new Models\APIKey();
        // $User = new Models\User();

        // if (!array_key_exists('apiKey', $this->request)) {
        //     throw new Exception('No API Key provided');
        // } //else if (!$APIKey->verifyKey($this->request['apiKey'], $origin)) {
        //     throw new Exception('Invalid API Key');
        // } else if (array_key_exists('token', $this->request) && !$User->get('token', $this->request['token'])) {
        //     throw new Exception('Invalid User Token');
        // }

        $this->User = true;
    }

    /**
     * Example of an Endpoint
     */
     protected function games($_args) {
     
        // var_dump($this->method);
         // var_dump($this->endpoint);
         // var_dump($this->verb);
        // var_dump($this->args);
        // var_dump($this->file);
        // var_dump($this->request);


        $db = new Db();

        if ($this->method == 'GET') {
            if(count($this->args)) {
                return $this->_response($db->select($this->endpoint, $this->args[0]));               
            }elseif($this->verb === "search"){
                return $this->_response($db->search($this->endpoint, $this->request));
            }else{
                 return $this->_response($db->select($this->endpoint));
            }
        } elseif ($this->method == 'PUT'){
            return "UPDATE";
        } elseif ($this->method == 'POST'){
            return $this->_response($db->insert($this->endpoint, $this->request));
        } elseif ($this->method == 'DELETE'){
             return "DELETE";
        }else{
            return $this->_response("Request error ", 500);
        }
     }
 }