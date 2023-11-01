"use client"

import { useState, useEffect } from 'react'

import { getUser } from "@/utils/userUtils"

import authService from "../services/authService"

export const useAuth = () => {

  //codigo provisorio enquanto api nao funciona
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuth(true);
  }, []);

  return [auth, loading];



  /* codigo original para quando o backend estuver funcional
  const [user, setUser] = useState();

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //let usuario = null;
    //if(typeof window !== 'undefined'){
      //usuario = JSON.parse(localStorage.getItem('user'));
    //}

    const usuario = getUser();
    setUser(usuario);
  }, []);

  useEffect(async () => {
    if(user){
      await authService.validateUser(user.token).then((data) => {
        if(data.status === 201){
          setAuth(true);
        }
        else{
          authService.logout();
          setAuth(false);
        }
        setLoading(false);
      });
    } else {
      setAuth(false);
      setLoading(false);
    }
  }, [user]);

  return auth, loading;
  */


}