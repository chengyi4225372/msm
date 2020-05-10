<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/5/10
 * Time: 16:04
 */
namespace app\index\controller;

use app\index\controller\Base;

class News extends Base
{
    public  function index(){
        return $this->fetch();
    }
}
