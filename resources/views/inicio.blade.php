<script type="text/javascript" src="{!! asset('js/inicio/inicio.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/inicio.css')}}">
@extends('layouts.layout')

@section('content')
    @csrf
    <div id="content-wrapper">
        <div class="containerScroll" id="containerScroll">
            <div class="containerMedia" id="containerMedia">     
            </div>
        </div>
        
    <div class="search">
        <form class="searchedUserForm" id="searchedUserForm" action="{{ route('searchedUser') }}" method="POST">
            @csrf
            <div class="inputContainer">
                <div class="imgSearchContainer">
                    <img src="{{asset('img/sidebar/lupa.png')}}" class="imgSearch" alt="más">
                </div>
                <input id="searchUser" type="text" name="searchedUser" placeholder="Buscar usuarios">
            </div>
            <button class="botonUserForm" id="botonUserForm" type="submit"></button>
        </form>
        <div class="resultadosUsersDiv" tabindex="0" id="resultadosUsersDiv"></div>
    </div>

    </div>
@endsection
