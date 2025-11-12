<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Jurisprudence extends Model
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
        'court_name',
        'case_number',
        'decision_date',
        'pdf_path',
        'tags',
        'language',
        'is_published',
        'views_count',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_published' => 'boolean',
        'decision_date' => 'date',
        'views_count' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($jurisprudence) {
            if (empty($jurisprudence->slug)) {
                $jurisprudence->slug = Str::slug($jurisprudence->title_fr);
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
