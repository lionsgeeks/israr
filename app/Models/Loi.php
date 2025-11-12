<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Loi extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'title_fr',
        'title_ar',
        'description_fr',
        'description_ar',
        'content_fr',
        'content_ar',
        'law_number',
        'publication_date',
        'effective_date',
        'pdf_path',
        'tags',
        'language',
        'is_published',
        'views_count',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_published' => 'boolean',
        'publication_date' => 'date',
        'effective_date' => 'date',
        'views_count' => 'integer',
    ];

    /**
     * Generate slug from title if not provided
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($loi) {
            if (empty($loi->slug)) {
                $loi->slug = Str::slug($loi->title_fr);
            }
        });
    }

    /**
     * Get the route key for the model
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
