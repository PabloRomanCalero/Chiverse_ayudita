<script type="text/javascript" src="{!! asset('js/carrito/carrito.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/carrito/carrito.css')}}">


@extends('layouts.layout')

@section('content')
    @csrf   
    <section class="section-carrito" id="section-carrito">

    </section>


@endsection