<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Guide extends Model
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
        'category',
        'pdf_path',
        'tags',
        'language',
        'is_published',
        'views_count',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_published' => 'boolean',
        'views_count' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($guide) {
            if (empty($guide->slug)) {
                $guide->slug = Str::slug($guide->title_fr);
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
