@extends('PDF.layouts.app')
@section('content')

<table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
    <tbody>       
        <tr>
            <td style="padding-bottom:20px;">		      
                Company Name
		    </td>
            <td>
                {{ $user->employer->name }}                                    
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
                <p>{{ $user->employer->address }} </p>                             
                <p>{{ $user->employer->state }} </p>                             
                <p>{{ $user->employer->city }} </p>                             
                <p>{{ $user->employer->district }} </p>                             
                <p>{{ $user->employer->country }} </p>  
            </td>
        </tr>

  </tbody>
</table>


@endsection
