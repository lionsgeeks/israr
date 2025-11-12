<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class AideRequest extends Model
{
    use SoftDeletes;

    protected $table = 'aide_requests';

    protected $fillable = [
        'name',
        'region',
        'type_of_violence',
        'description',
        'contact_method',
        'contact_value',
        'consent_given',
        'ip_address',
        'user_agent',
        'status',
        'admin_notes',
        'assigned_to',
    ];

    protected $casts = [
        'consent_given' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
        'name' => 'encrypted',
        'type_of_violence' => 'encrypted',
        'description' => 'encrypted',
        'contact_value' => 'encrypted',
    ];

    /**
     * Get the user assigned to this request
     */
    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
