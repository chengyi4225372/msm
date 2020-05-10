<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/5/10
 * Time: 15:47
 */
namespace app\index\controller;

use think\Controller;

class login  extends Controller
{
    //登录
    public function login(){
        return $this->fetch();
    }

    /**
     * todo
     * 退出
     */
    public function loginout(){

    }


}