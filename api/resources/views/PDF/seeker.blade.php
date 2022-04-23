@extends('PDF.layouts.app')
@section('content')

<table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
    <tbody>       
        <tr>
            <td style="padding-bottom:20px;">		      
                Name
		    </td>
            <td>
                {{ $user->name }}                                    
            </td>
        </tr>
        <tr>
            <td>
                Phone
            </td>
            <td>
            {{ $user->phone }}
            </td>
        </tr>
        <tr>
            <td>
                Email
            </td>
            <td>
                {{ $user->email }}
            </td>
        </tr>
        <tr>
            <td>
                Contact Details
            </td>
            <td>                                        
                <p>{{ $user->seeker->address }} </p>                             
                <p>{{ $user->seeker->state }} </p>                             
                <p>{{ $user->seeker->city }} </p>                             
                <p>{{ $user->seeker->district }} </p>                             
                <p>{{ $user->seeker->country }} </p>  
            </td>
        </tr>

  </tbody>
</table>


@endsection
