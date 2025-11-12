<?php

namespace App\Http\Controllers\Aide;

use App\Http\Controllers\Controller;
use App\Models\Guide;
use App\Models\Jurisprudence;
use App\Models\Loi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BaseJuridiqueController extends Controller
{
    /**
     * Show the documentary base search page
     * FR/AR search engine for laws and guides
     */
    public function index(Request $request): Response
    {
        $query = $request->get('q', '');
        $type = $request->get('type', 'all'); // all, lois, jurisprudences, guides
        $language = $request->get('language', 'all'); // all, fr, ar
        $tag = $request->get('tag');

        $results = [
            'lois' => collect(),
            'jurisprudences' => collect(),
            'guides' => collect(),
        ];

        if ($type === 'all' || $type === 'lois') {
            $loisQuery = Loi::where('is_published', true);
            
            if ($query) {
                $loisQuery->where(function ($q) use ($query) {
                    $q->where('title_fr', 'like', "%{$query}%")
                      ->orWhere('title_ar', 'like', "%{$query}%")
                      ->orWhere('description_fr', 'like', "%{$query}%")
                      ->orWhere('description_ar', 'like', "%{$query}%")
                      ->orWhere('content_fr', 'like', "%{$query}%")
                      ->orWhere('content_ar', 'like', "%{$query}%");
                });
            }

            if ($language !== 'all') {
                $loisQuery->where('language', $language);
            }

            if ($tag) {
                $loisQuery->whereJsonContains('tags', $tag);
            }

            $results['lois'] = $loisQuery->latest()->paginate(10)->withQueryString();
        }

        if ($type === 'all' || $type === 'jurisprudences') {
            $jurisprudencesQuery = Jurisprudence::where('is_published', true);
            
            if ($query) {
                $jurisprudencesQuery->where(function ($q) use ($query) {
                    $q->where('title_fr', 'like', "%{$query}%")
                      ->orWhere('title_ar', 'like', "%{$query}%")
                      ->orWhere('description_fr', 'like', "%{$query}%")
                      ->orWhere('description_ar', 'like', "%{$query}%")
                      ->orWhere('content_fr', 'like', "%{$query}%")
                      ->orWhere('content_ar', 'like', "%{$query}%");
                });
            }

            if ($language !== 'all') {
                $jurisprudencesQuery->where('language', $language);
            }

            if ($tag) {
                $jurisprudencesQuery->whereJsonContains('tags', $tag);
            }

            $results['jurisprudences'] = $jurisprudencesQuery->latest()->paginate(10)->withQueryString();
        }

        if ($type === 'all' || $type === 'guides') {
            $guidesQuery = Guide::where('is_published', true);
            
            if ($query) {
                $guidesQuery->where(function ($q) use ($query) {
                    $q->where('title_fr', 'like', "%{$query}%")
                      ->orWhere('title_ar', 'like', "%{$query}%")
                      ->orWhere('description_fr', 'like', "%{$query}%")
                      ->orWhere('description_ar', 'like', "%{$query}%")
                      ->orWhere('content_fr', 'like', "%{$query}%")
                      ->orWhere('content_ar', 'like', "%{$query}%");
                });
            }

            if ($language !== 'all') {
                $guidesQuery->where('language', $language);
            }

            if ($tag) {
                $guidesQuery->whereJsonContains('tags', $tag);
            }

            $results['guides'] = $guidesQuery->latest()->paginate(10)->withQueryString();
        }

        // Get all unique tags for filter
        $allTags = collect()
            ->merge(Loi::where('is_published', true)->pluck('tags')->flatten())
            ->merge(Jurisprudence::where('is_published', true)->pluck('tags')->flatten())
            ->merge(Guide::where('is_published', true)->pluck('tags')->flatten())
            ->filter()
            ->unique()
            ->sort()
            ->values();

        return Inertia::render('aide/BaseJuridique/index', [
            'results' => $results,
            'filters' => [
                'q' => $query,
                'type' => $type,
                'language' => $language,
                'tag' => $tag,
            ],
            'tags' => $allTags,
        ]);
    }

    /**
     * Show a specific loi
     */
    public function showLoi(Loi $loi): Response
    {
        if (!$loi->is_published) {
            abort(404);
        }

        $loi->increment('views_count');

        return Inertia::render('aide/BaseJuridique/lois/Show', [
            'loi' => [
                'id' => $loi->id,
                'slug' => $loi->slug,
                'title_fr' => $loi->title_fr,
                'title_ar' => $loi->title_ar,
                'description_fr' => $loi->description_fr,
                'description_ar' => $loi->description_ar,
                'content_fr' => $loi->content_fr,
                'content_ar' => $loi->content_ar,
                'law_number' => $loi->law_number,
                'publication_date' => $loi->publication_date?->format('Y-m-d'),
                'effective_date' => $loi->effective_date?->format('Y-m-d'),
                'pdf_path' => $loi->pdf_path,
                'tags' => $loi->tags,
            ],
        ]);
    }

    /**
     * Show a specific jurisprudence
     */
    public function showJurisprudence(Jurisprudence $jurisprudence): Response
    {
        if (!$jurisprudence->is_published) {
            abort(404);
        }

        $jurisprudence->increment('views_count');

        return Inertia::render('aide/BaseJuridique/jurisprudences/Show', [
            'jurisprudence' => [
                'id' => $jurisprudence->id,
                'slug' => $jurisprudence->slug,
                'title_fr' => $jurisprudence->title_fr,
                'title_ar' => $jurisprudence->title_ar,
                'description_fr' => $jurisprudence->description_fr,
                'description_ar' => $jurisprudence->description_ar,
                'content_fr' => $jurisprudence->content_fr,
                'content_ar' => $jurisprudence->content_ar,
                'court_name' => $jurisprudence->court_name,
                'case_number' => $jurisprudence->case_number,
                'decision_date' => $jurisprudence->decision_date?->format('Y-m-d'),
                'pdf_path' => $jurisprudence->pdf_path,
                'tags' => $jurisprudence->tags,
            ],
        ]);
    }

    /**
     * Show a specific guide
     */
    public function showGuide(Guide $guide): Response
    {
        if (!$guide->is_published) {
            abort(404);
        }

        $guide->increment('views_count');

        return Inertia::render('aide/BaseJuridique/guides/Show', [
            'guide' => [
                'id' => $guide->id,
                'slug' => $guide->slug,
                'title_fr' => $guide->title_fr,
                'title_ar' => $guide->title_ar,
                'description_fr' => $guide->description_fr,
                'description_ar' => $guide->description_ar,
                'content_fr' => $guide->content_fr,
                'content_ar' => $guide->content_ar,
                'category' => $guide->category,
                'pdf_path' => $guide->pdf_path,
                'tags' => $guide->tags,
            ],
        ]);
    }
}
