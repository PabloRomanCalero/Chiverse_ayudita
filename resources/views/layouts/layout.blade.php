
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chicverse</title>
    <link rel="icon" type="image/png" href="{{asset('img/sidebar/logo.png')}}">
    <link rel="stylesheet" href="{{asset('css/partials/sidebar.css')}}">
    <script src="https://kit.fontawesome.com/ad1cd15c21.js" crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    @include('partials.sidebar')
    <main>
        @yield('content')
    </main>

</body>

</html>