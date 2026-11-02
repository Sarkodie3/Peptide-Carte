import React, { useState } from 'react';
import { labResults } from '../../data/labResultsData';
import { LabResult } from '../../types/labResult';
import { Search, ShieldCheck, ExternalLink, Calendar, Filter, ArrowUpDown } from 'lucide-react';

export const COATable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [minPurity, setMinPurity] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'product' | 'purity' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredResults = labResults
    .filter((l) => {
      const matchQuery =
        l.product.toLowerCase().includes(search.toLowerCase()) ||
        l.batch.toLowerCase().includes(search.toLowerCase()) ||
        l.notes.toLowerCase().includes(search.toLowerCase());
      const matchPurity = l.purityNumeric >= minPurity;
      return matchQuery && matchPurity;
    })
    .sort((a, b) => {
      if (sortBy === 'product') {
        return sortOrder === 'asc'
          ? a.product.localeCompare(b.product)
          : b.product.localeCompare(a.product);
      }
      if (sortBy === 'purity') {
        return sortOrder === 'asc'
          ? a.purityNumeric - b.purityNumeric
          : b.purityNumeric - a.purityNumeric;
      }
      // default: preserve list order or date
      return 0;
    });

  const toggleSort = (field: 'product' | 'purity' | 'date') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-100 shadow-brand overflow-hidden">
      {/* Controls Bar */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by peptide or batch (e.g. PE2#00004)..."
            className="w-full bg-white border border-slate-200 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-700"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Purity Filter */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700">
            <Filter className="w-3.5 h-3.5 text-brand-700" />
            <span>Purity:</span>
            <select
              value={minPurity}
              onChange={(e) => setMinPurity(parseFloat(e.target.value))}
              aria-label="Filter by minimum purity"
              className="bg-transparent font-semibold text-brand-900 focus:outline-none cursor-pointer"
            >
              <option value={0}>All Purities</option>
              <option value={99.0}>≥ 99.0%</option>
              <option value={99.5}>≥ 99.5%</option>
              <option value={99.7}>≥ 99.7%</option>
            </select>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-brand-950 font-bold">{filteredResults.length}</strong> of {labResults.length} records
          </span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-50/60 border-b border-brand-100 text-[11px] font-bold uppercase tracking-wider text-brand-900">
              <th 
                onClick={() => toggleSort('product')}
                className="py-4 px-6 cursor-pointer hover:text-brand-700"
              >
                <div className="flex items-center gap-1.5">
                  <span>Product Name</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-4 px-6">Batch ID</th>
              <th className="py-4 px-6">Analytical Testing Laboratory</th>
              <th className="py-4 px-6">Analysis Date</th>
              <th 
                onClick={() => toggleSort('purity')}
                className="py-4 px-6 cursor-pointer hover:text-brand-700"
              >
                <div className="flex items-center gap-1.5">
                  <span>HPLC Purity</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-4 px-6 text-right">Verification Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredResults.map((item) => (
              <tr 
                key={item.id}
                className="hover:bg-brand-50/30 transition-colors group"
              >
                <td className="py-4 px-6 font-bold text-slate-900 group-hover:text-brand-800">
                  {item.product}
                </td>
                <td className="py-4 px-6 font-mono text-xs text-slate-600">
                  <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {item.batch}
                  </span>
                </td>
                <td className="py-4 px-6 text-xs text-slate-600">
                  {item.lab}
                </td>
                <td className="py-4 px-6 text-xs text-slate-500 flex items-center gap-1.5 pt-5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.date}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.purity}</span>
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <a
                    href={item.reportUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 hover:text-brand-950 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg border border-brand-200 transition-colors shadow-sm"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Cards View */}
      <div className="lg:hidden p-4 space-y-3">
        {filteredResults.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {item.product}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                    {item.batch}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{item.date}</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{item.purity}</span>
              </span>
            </div>

            <div className="text-xs text-slate-500">
              Lab: <strong className="text-slate-700">{item.lab}</strong>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Method: HPLC / LC-MS</span>
              <a
                href={item.reportUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-800 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-200"
              >
                <span>View Full COA</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="p-12 text-center text-slate-400 text-sm">
          No lab verification records match your current filters.
        </div>
      )}
    </div>
  );
};
