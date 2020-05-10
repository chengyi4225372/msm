<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/5/10
 * Time: 16:06
 */
namespace app\index\controller;

use app\index\controller\Base;

class Wechat extends Base
{
    public  function index(){
        return $this->fetch();
    }
}